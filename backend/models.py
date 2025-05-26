"""
Models for IntellMeetingApp backend.
This file contains data models that would typically be used with a database.
Currently using simple classes for structure, but could be replaced with 
SQLAlchemy models or similar in the future.
"""

from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class AgendaItem:
    id: str
    title: str
    duration: int  # in minutes
    presenter: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None  # 'covered', 'partially covered', 'uncovered'

@dataclass
class Participant:
    id: str
    name: str
    email: str
    role: str  # 'Host', 'Presenter', 'Attendee', 'Optional'
    avatar: Optional[str] = None
    speaking_time: Optional[int] = None  # in minutes

@dataclass
class MeetingAnalytics:
    agenda_completion_rate: float  # percentage
    speaking_distribution: dict  # participant_id -> percentage
    time_efficiency: float  # percentage
    cost_estimate: float  # currency value
    
@dataclass
class Meeting:
    id: int
    title: str
    date: str
    start_time: str
    end_time: str
    agenda: List[AgendaItem] = field(default_factory=list)
    participants: List[Participant] = field(default_factory=list)
    analytics: Optional[MeetingAnalytics] = None
    
    @property
    def duration_minutes(self) -> int:
        """Calculate the meeting duration in minutes"""
        start = datetime.strptime(self.start_time, "%H:%M")
        end = datetime.strptime(self.end_time, "%H:%M")
        
        # Handle case where end time is on the next day
        if end < start:
            end = end.replace(day=start.day + 1)
            
        delta = end - start
        return int(delta.total_seconds() / 60)
    
    def calculate_cost(self, hourly_rate: float = 75.0) -> float:
        """Calculate the meeting cost based on duration and participants"""
        hours = self.duration_minutes / 60
        return hours * len(self.participants) * hourly_rate