"""
Constraint validation engine
"""

from app.models.database import Event
from datetime import datetime
from typing import List, Dict

class ConstraintValidator:
    """Validates scheduling constraints"""
    
    def __init__(self):
        self.constraints = []
    
    def add_constraint(self, constraint_type: str, params: dict):
        """Add a constraint"""
        self.constraints.append({
            "type": constraint_type,
            "params": params
        })
    
    def validate_event(self, event: Event) -> List[Dict]:
        """Validate event against all constraints"""
        violations = []
        
        for constraint in self.constraints:
            if constraint["type"] == "duration":
                if self._validate_duration(event, constraint["params"]):
                    violations.append({
                        "constraint": "duration",
                        "message": "Event duration violates constraint"
                    })
            
            elif constraint["type"] == "time_window":
                if self._validate_time_window(event, constraint["params"]):
                    violations.append({
                        "constraint": "time_window",
                        "message": "Event time violates allowed window"
                    })
            
            elif constraint["type"] == "no_conflicts":
                if self._validate_no_conflicts(event, constraint["params"]):
                    violations.append({
                        "constraint": "no_conflicts",
                        "message": "Event creates scheduling conflict"
                    })
        
        return violations
    
    def _validate_duration(self, event: Event, params: dict) -> bool:
        """Check if event duration meets constraints"""
        min_duration = params.get("min_minutes", 0)
        max_duration = params.get("max_minutes", float('inf'))
        
        duration = (event.end_time - event.start_time).total_seconds() / 60
        
        return duration < min_duration or duration > max_duration
    
    def _validate_time_window(self, event: Event, params: dict) -> bool:
        """Check if event falls within allowed time window"""
        allowed_start_hour = params.get("start_hour", 0)
        allowed_end_hour = params.get("end_hour", 24)
        
        event_start_hour = event.start_time.hour
        event_end_hour = event.end_time.hour
        
        return event_start_hour < allowed_start_hour or event_end_hour > allowed_end_hour
    
    def _validate_no_conflicts(self, event: Event, params: dict) -> bool:
        """Check if event creates conflicts with existing events"""
        existing_events = params.get("existing_events", [])
        
        for other_event in existing_events:
            if not (event.end_time <= other_event.start_time or event.start_time >= other_event.end_time):
                return True
        
        return False
