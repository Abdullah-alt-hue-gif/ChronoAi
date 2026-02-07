"""
Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Event schemas
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    event_type: str  # conference, hackathon, tournament, workshop
    location: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    event_type: Optional[str] = None
    location: Optional[str] = None
    is_tentative: Optional[bool] = None

class Event(EventBase):
    id: int
    owner_id: int
    is_tentative: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class EventWithConflicts(Event):
    conflicts: List['Conflict'] = []

# Conflict schemas
class ConflictBase(BaseModel):
    conflict_with_event_id: int
    conflict_type: str
    severity: str

class ConflictCreate(ConflictBase):
    pass

class Conflict(ConflictBase):
    id: int
    event_id: int
    resolution: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
