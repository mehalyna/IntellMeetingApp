"""
API routes for IntellMeetingApp backend.
This file contains the API endpoints for the application.
"""

from flask import Blueprint, jsonify, request
from .models import Meeting, AgendaItem, Participant, MeetingAnalytics
from datetime import datetime, timedelta

api = Blueprint('api', __name__)

# Temporary in-memory data storage
meetings = []
meeting_id_counter = 1

# Initialize with sample data
def init_sample_data():
    global meetings, meeting_id_counter
    
    sample_agenda = [
        AgendaItem(id="1", title="Quick check-in", duration=5),
        AgendaItem(id="2", title="Review Q3 Performance", duration=15),
        AgendaItem(id="3", title="Discuss Marketing Strategy", duration=20),
        AgendaItem(id="4", title="Action Items & Next Steps", duration=10)
    ]
    
    sample_participants = [
        Participant(
            id="1",
            name="Alice Smith",
            email="alice@example.com",
            role="Host",
            avatar="https://randomuser.me/api/portraits/women/44.jpg"
        ),
        Participant(
            id="2",
            name="Bob Johnson",
            email="bob@example.com",
            role="Presenter",
            avatar="https://randomuser.me/api/portraits/men/32.jpg"
        )
    ]
    
    sample_meeting = Meeting(
        id=0,
        title="Q3 Planning Session",
        date="2025-06-15",
        start_time="10:00",
        end_time="11:30",
        agenda=sample_agenda,
        participants=sample_participants
    )
    
    meetings.append(sample_meeting)
    meeting_id_counter = 1

init_sample_data()

@api.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Flask backend API is running'}), 200

@api.route('/meetings', methods=['GET'])
def get_meetings():
    # Convert meetings to dictionary for JSON serialization
    meetings_dict = [
        {
            'id': m.id,
            'title': m.title,
            'date': m.date,
            'startTime': m.start_time,
            'endTime': m.end_time,
            'agenda': [vars(item) for item in m.agenda],
            'participants': [vars(p) for p in m.participants]
        }
        for m in meetings
    ]
    return jsonify(meetings_dict), 200

@api.route('/meetings', methods=['POST'])
def create_meeting():
    global meeting_id_counter
    data = request.json
    
    # Validate required fields
    required_fields = ['title', 'date', 'startTime', 'endTime']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Parse agenda items
    agenda_items = []
    for item_data in data.get('agenda', []):
        agenda_items.append(AgendaItem(
            id=item_data.get('id', str(len(agenda_items) + 1)),
            title=item_data.get('title', ''),
            duration=item_data.get('duration', 0),
            presenter=item_data.get('presenter')
        ))
    
    # Parse participants
    participants = []
    for p_data in data.get('participants', []):
        participants.append(Participant(
            id=p_data.get('id', str(len(participants) + 1)),
            name=p_data.get('name', ''),
            email=p_data.get('email', ''),
            role=p_data.get('role', 'Attendee'),
            avatar=p_data.get('avatar')
        ))
    
    # Create new meeting
    meeting = Meeting(
        id=meeting_id_counter,
        title=data['title'],
        date=data['date'],
        start_time=data['startTime'],
        end_time=data['endTime'],
        agenda=agenda_items,
        participants=participants
    )
    
    meetings.append(meeting)
    meeting_id_counter += 1
    
    # Convert to dict for response
    meeting_dict = {
        'id': meeting.id,
        'title': meeting.title,
        'date': meeting.date,
        'startTime': meeting.start_time,
        'endTime': meeting.end_time,
        'agenda': [vars(item) for item in meeting.agenda],
        'participants': [vars(p) for p in meeting.participants]
    }
    
    return jsonify(meeting_dict), 201

@api.route('/meetings/<int:meeting_id>', methods=['GET'])
def get_meeting(meeting_id):
    meeting = next((m for m in meetings if m.id == meeting_id), None)
    
    if not meeting:
        return jsonify({'error': 'Meeting not found'}), 404
    
    # Convert to dict for response
    meeting_dict = {
        'id': meeting.id,
        'title': meeting.title,
        'date': meeting.date,
        'startTime': meeting.start_time,
        'endTime': meeting.end_time,
        'agenda': [vars(item) for item in meeting.agenda],
        'participants': [vars(p) for p in meeting.participants]
    }
    
    return jsonify(meeting_dict), 200

@api.route('/meetings/<int:meeting_id>', methods=['PUT'])
def update_meeting(meeting_id):
    meeting = next((m for m in meetings if m.id == meeting_id), None)
    
    if not meeting:
        return jsonify({'error': 'Meeting not found'}), 404
    
    data = request.json
    
    # Update fields
    if 'title' in data:
        meeting.title = data['title']
    if 'date' in data:
        meeting.date = data['date']
    if 'startTime' in data:
        meeting.start_time = data['startTime']
    if 'endTime' in data:
        meeting.end_time = data['endTime']
        
    # Update agenda items if present
    if 'agenda' in data:
        meeting.agenda = []
        for item_data in data['agenda']:
            meeting.agenda.append(AgendaItem(
                id=item_data.get('id', str(len(meeting.agenda) + 1)),
                title=item_data.get('title', ''),
                duration=item_data.get('duration', 0),
                presenter=item_data.get('presenter')
            ))
    
    # Update participants if present
    if 'participants' in data:
        meeting.participants = []
        for p_data in data['participants']:
            meeting.participants.append(Participant(
                id=p_data.get('id', str(len(meeting.participants) + 1)),
                name=p_data.get('name', ''),
                email=p_data.get('email', ''),
                role=p_data.get('role', 'Attendee'),
                avatar=p_data.get('avatar')
            ))
    
    # Convert to dict for response
    meeting_dict = {
        'id': meeting.id,
        'title': meeting.title,
        'date': meeting.date,
        'startTime': meeting.start_time,
        'endTime': meeting.end_time,
        'agenda': [vars(item) for item in meeting.agenda],
        'participants': [vars(p) for p in meeting.participants]
    }
    
    return jsonify(meeting_dict), 200

@api.route('/meetings/<int:meeting_id>/cost', methods=['GET'])
def calculate_meeting_cost(meeting_id):
    meeting = next((m for m in meetings if m.id == meeting_id), None)
    
    if not meeting:
        return jsonify({'error': 'Meeting not found'}), 404
    
    # Calculate cost using the model's method
    hourly_rate = 75  # Default hourly rate
    duration_hours = meeting.duration_minutes / 60
    total_cost = meeting.calculate_cost(hourly_rate)
    
    return jsonify({
        'meetingId': meeting.id,
        'durationHours': round(duration_hours, 2),
        'participantCount': len(meeting.participants),
        'hourlyRate': hourly_rate,
        'totalCost': round(total_cost, 2)
    }), 200

@api.route('/suggestions/agenda', methods=['POST'])
def get_agenda_suggestions():
    data = request.json
    meeting_title = data.get('title', '')
    
    # This is where you would integrate with a more sophisticated
    # suggestion system or AI. For now, return fixed suggestions.
    suggestions = [
        {"id": "s1", "text": "Review previous meeting action items", "type": "essential"},
        {"id": "s2", "text": "Project status updates from team leads", "type": "recommended"},
        {"id": "s3", "text": "Next steps and action items", "type": "essential"},
        {"id": "s4", "text": "Open forum for questions", "type": "optional"}
    ]
    
    # Add title-specific suggestion if title contains certain keywords
    if any(keyword in meeting_title.lower() for keyword in ['planning', 'strategy', 'quarterly']):
        suggestions.append({
            "id": "s5",
            "text": "Goal setting and KPI review",
            "type": "recommended"
        })
    
    return jsonify(suggestions), 200