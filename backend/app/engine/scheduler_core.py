"""
Core scheduling and constraint engine
"""

from sqlalchemy.orm import Session
from app.models.database import Event, Conflict
from datetime import datetime, timedelta
from typing import List
import logging

logger = logging.getLogger(__name__)

def check_conflicts(new_event: Event, db: Session) -> List[Conflict]:
    """
    Check for scheduling conflicts with existing events
    """
    conflicts = []
    
    # Get all events for the same user
    existing_events = db.query(Event).filter(
        Event.owner_id == new_event.owner_id,
        Event.id != new_event.id
    ).all()
    
    for existing_event in existing_events:
        if has_time_overlap(new_event, existing_event):
            conflict = Conflict(
                event_id=new_event.id,
                conflict_with_event_id=existing_event.id,
                conflict_type="time_overlap",
                severity=calculate_conflict_severity(new_event, existing_event)
            )
            conflicts.append(conflict)
    
    return conflicts

def has_time_overlap(event1: Event, event2: Event) -> bool:
    """
    Check if two events have time overlap
    """
    return not (event1.end_time <= event2.start_time or event1.start_time >= event2.end_time)

def calculate_conflict_severity(event1: Event, event2: Event) -> str:
    """
    Calculate the severity of a conflict
    """
    overlap_duration = min(event1.end_time, event2.end_time) - max(event1.start_time, event2.start_time)
    
    if overlap_duration.total_seconds() < 1800:  # Less than 30 minutes
        return "low"
    elif overlap_duration.total_seconds() < 3600:  # Less than 1 hour
        return "medium"
    else:
        return "high"

def resolve_conflict(event: Event, suggested_start: datetime, suggested_end: datetime) -> bool:
    """
    Attempt to resolve a conflict by rescheduling
    """
    if suggested_start >= suggested_end:
        return False
    
    event.start_time = suggested_start
    event.end_time = suggested_end
    event.is_tentative = False
    
    return True

def find_optimal_time_slot(
    event: Event,
    db: Session,
    preferred_duration_minutes: int = 60
) -> tuple:
    """
    Find optimal time slot for an event with no conflicts
    """
    existing_events = db.query(Event).filter(
        Event.owner_id == event.owner_id
    ).order_by(Event.start_time).all()
    
    # Check next 30 days
    current_time = datetime.utcnow()
    
    for day_offset in range(30):
        check_date = current_time + timedelta(days=day_offset)
        
        # Try different times of day
        for hour in range(9, 18):  # 9 AM to 6 PM
            start_time = check_date.replace(hour=hour, minute=0, second=0)
            end_time = start_time + timedelta(minutes=preferred_duration_minutes)
            
            # Check if this slot is free
            has_conflict = False
            for existing_event in existing_events:
                if not (end_time <= existing_event.start_time or start_time >= existing_event.end_time):
                    has_conflict = True
                    break
            
            if not has_conflict:
                return (start_time, end_time)
    
    return None
