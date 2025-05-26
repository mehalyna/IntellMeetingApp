from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

# Temporary in-memory data storage
meetings = []
meeting_id_counter = 1

# Sample data for development
sample_meeting = {
    "id": 0,
    "title": "Q3 Planning Session",
    "date": "2025-06-15",
    "startTime": "10:00",
    "endTime": "11:30",
    "agenda": [
        {"id": "1", "title": "Quick check-in", "duration": 5},
        {"id": "2", "title": "Review Q3 Performance", "duration": 15},
        {"id": "3", "title": "Discuss Marketing Strategy", "duration": 20},
        {"id": "4", "title": "Action Items & Next Steps", "duration": 10}
    ],
    "participants": [
        {
            "id": "1",
            "name": "Alice Smith",
            "email": "alice@example.com",
            "role": "Host",
            "avatar": "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            "id": "2",
            "name": "Bob Johnson",
            "email": "bob@example.com",
            "role": "Presenter",
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg"
        }
    ]
}

meetings.append(sample_meeting)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Flask backend is running'}), 200

@app.route('/api/meetings', methods=['GET'])
def get_meetings():
    return jsonify(meetings), 200

@app.route('/api/meetings', methods=['POST'])
def create_meeting():
    global meeting_id_counter
    data = request.json
    
    # Validate required fields
    required_fields = ['title', 'date', 'startTime', 'endTime']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Create new meeting
    meeting = {
        'id': meeting_id_counter,
        'title': data['title'],
        'date': data['date'],
        'startTime': data['startTime'],
        'endTime': data['endTime'],
        'agenda': data.get('agenda', []),
        'participants': data.get('participants', [])
    }
    
    meetings.append(meeting)
    meeting_id_counter += 1
    
    return jsonify(meeting), 201

@app.route('/api/meetings/<int:meeting_id>', methods=['GET'])
def get_meeting(meeting_id):
    meeting = next((m for m in meetings if m['id'] == meeting_id), None)
    
    if not meeting:
        return jsonify({'error': 'Meeting not found'}), 404
    
    return jsonify(meeting), 200

@app.route('/api/meetings/<int:meeting_id>', methods=['PUT'])
def update_meeting(meeting_id):
    meeting = next((m for m in meetings if m['id'] == meeting_id), None)
    
    if not meeting:
        return jsonify({'error': 'Meeting not found'}), 404
    
    data = request.json
    
    # Update fields
    if 'title' in data:
        meeting['title'] = data['title']
    if 'date' in data:
        meeting['date'] = data['date']
    if 'startTime' in data:
        meeting['startTime'] = data['startTime']
    if 'endTime' in data:
        meeting['endTime'] = data['endTime']
    if 'agenda' in data:
        meeting['agenda'] = data['agenda']
    if 'participants' in data:
        meeting['participants'] = data['participants']
    
    return jsonify(meeting), 200

@app.route('/api/meetings/<int:meeting_id>/cost', methods=['GET'])
def calculate_meeting_cost(meeting_id):
    meeting = next((m for m in meetings if m['id'] == meeting_id), None)
    
    if not meeting:
        return jsonify({'error': 'Meeting not found'}), 404
    
    # Calculate meeting duration in hours
    start_time = datetime.strptime(meeting['startTime'], '%H:%M')
    end_time = datetime.strptime(meeting['endTime'], '%H:%M')
    
    # Handle case where end time is on the next day
    if end_time < start_time:
        end_time += timedelta(days=1)
    
    duration_hours = (end_time - start_time).total_seconds() / 3600
    
    # Calculate cost (simple hourly rate * participants * duration)
    hourly_rate = 75  # Default hourly rate
    participants_count = len(meeting['participants'])
    
    total_cost = hourly_rate * participants_count * duration_hours
    
    return jsonify({
        'meetingId': meeting_id,
        'durationHours': round(duration_hours, 2),
        'participantCount': participants_count,
        'hourlyRate': hourly_rate,
        'totalCost': round(total_cost, 2)
    }), 200

@app.route('/api/suggestions/agenda', methods=['POST'])
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)