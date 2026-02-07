"""
Events routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.models.database import get_db, Event, User, Conflict
from app.models.schemas import Event as EventSchema, EventCreate, EventUpdate, EventWithConflicts
from app.utils.auth import get_current_user
from app.engine.scheduler_core import check_conflicts, resolve_conflict
from app.engine.explainer import generate_explanation
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/create", response_model=EventSchema)
async def create_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new event
    """
    if event.start_time >= event.end_time:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start time must be before end time"
        )
    
    # Create new event
    new_event = Event(
        **event.dict(),
        owner_id=current_user.id
    )
    
    # Check for conflicts
    conflicts = check_conflicts(new_event, db)
    if conflicts:
        new_event.is_tentative = True
    
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    
    return new_event

@router.get("/list", response_model=List[EventWithConflicts])
async def list_events(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    List all events for current user
    """
    events = db.query(Event).filter(Event.owner_id == current_user.id).all()
    return events

@router.get("/{event_id}", response_model=EventWithConflicts)
async def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific event
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    if event.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this event"
        )
    
    return event

@router.put("/{event_id}", response_model=EventSchema)
async def update_event(
    event_id: int,
    event_update: EventUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an event
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    if event.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this event"
        )
    
    # Update fields
    for field, value in event_update.dict(exclude_unset=True).items():
        setattr(event, field, value)
    
    db.commit()
    db.refresh(event)
    
    return event

@router.delete("/{event_id}")
async def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete an event
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    if event.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this event"
        )
    
    db.delete(event)
    db.commit()
    
    return {"message": "Event deleted successfully"}

@router.get("/{event_id}/conflicts")
async def get_event_conflicts(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get conflicts for a specific event
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    if event.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this event"
        )
    
    conflicts = db.query(Conflict).filter(Conflict.event_id == event_id).all()
    return conflicts

@router.post("/{event_id}/resolve-conflict")
async def resolve_event_conflict(
    event_id: int,
    conflict_id: int,
    new_start_time: str,
    new_end_time: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Resolve a conflict by rescheduling event
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    if event.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this event"
        )
    
    conflict = db.query(Conflict).filter(Conflict.id == conflict_id).first()
    if not conflict:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conflict not found"
        )
    
    # Update event times
    try:
        from datetime import datetime
        event.start_time = datetime.fromisoformat(new_start_time)
        event.end_time = datetime.fromisoformat(new_end_time)
        event.is_tentative = False
        
        db.commit()
        db.refresh(event)
        
        # Generate explanation
        explanation = generate_explanation(event, conflict, db)
        
        return {
            "message": "Conflict resolved",
            "event": event,
            "explanation": explanation
        }
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid datetime format"
        )
