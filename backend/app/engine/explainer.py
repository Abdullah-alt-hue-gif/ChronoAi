"""
Explainability engine for scheduling decisions
"""

from sqlalchemy.orm import Session
from app.models.database import Event, Conflict
from datetime import datetime
from typing import Dict

def generate_explanation(event: Event, conflict: Conflict, db: Session) -> Dict:
    """
    Generate human-readable explanation for scheduling decision
    """
    conflicting_event = db.query(Event).filter(
        Event.id == conflict.conflict_with_event_id
    ).first()
    
    if not conflicting_event:
        return {"explanation": "Could not generate explanation"}
    
    # Calculate overlap details
    overlap_start = max(event.start_time, conflicting_event.start_time)
    overlap_end = min(event.end_time, conflicting_event.end_time)
    overlap_duration = (overlap_end - overlap_start).total_seconds() / 3600
    
    explanation = {
        "conflict_type": conflict.conflict_type,
        "severity": conflict.severity,
        "conflicting_event": {
            "title": conflicting_event.title,
            "start_time": conflicting_event.start_time.isoformat(),
            "end_time": conflicting_event.end_time.isoformat()
        },
        "overlap_details": {
            "overlap_start": overlap_start.isoformat(),
            "overlap_end": overlap_end.isoformat(),
            "overlap_duration_hours": round(overlap_duration, 2)
        },
        "recommendation": generate_recommendation(conflict.severity, overlap_duration),
        "suggested_actions": generate_suggested_actions(event, conflicting_event)
    }
    
    return explanation

def generate_recommendation(severity: str, overlap_hours: float) -> str:
    """Generate recommendation based on conflict severity"""
    if severity == "low":
        return "Minor overlap detected. Consider adjusting one event slightly."
    elif severity == "medium":
        return f"Significant overlap of {overlap_hours:.1f} hours detected. Recommend rescheduling one event."
    else:
        return f"Major overlap of {overlap_hours:.1f} hours detected. One event must be rescheduled."

def generate_suggested_actions(event1: Event, event2: Event) -> list:
    """Generate suggested actions to resolve conflict"""
    suggestions = [
        "Move one event to a different time slot",
        "Split the overlapping time between events",
        "Postpone lower priority event"
    ]
    
    # Check if events are on the same day
    if event1.start_time.date() == event2.start_time.date():
        suggestions.append("Schedule one event on a different day")
    
    return suggestions
