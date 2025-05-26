/**
 * API client for communicating with the Flask backend
 */

// API base URL - set this to the backend URL in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types
export interface AgendaItem {
  id: string;
  title: string;
  duration: number;
  presenter?: string;
  status?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'Host' | 'Presenter' | 'Attendee' | 'Optional';
  avatar?: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  agenda: AgendaItem[];
  participants: Participant[];
}

export interface MeetingCost {
  meetingId: number;
  durationHours: number;
  participantCount: number;
  hourlyRate: number;
  totalCost: number;
}

export interface AgendaSuggestion {
  id: string;
  text: string;
  type: 'essential' | 'recommended' | 'optional';
}

// API methods
export const api = {
  /**
   * Check backend health
   */
  checkHealth: async (): Promise<{ status: string; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  },

  /**
   * Get all meetings
   */
  getMeetings: async (): Promise<Meeting[]> => {
    const response = await fetch(`${API_BASE_URL}/meetings`);
    if (!response.ok) throw new Error('Failed to fetch meetings');
    return response.json();
  },

  /**
   * Get a specific meeting by ID
   */
  getMeeting: async (id: number): Promise<Meeting> => {
    const response = await fetch(`${API_BASE_URL}/meetings/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch meeting ${id}`);
    return response.json();
  },

  /**
   * Create a new meeting
   */
  createMeeting: async (meeting: Omit<Meeting, 'id'>): Promise<Meeting> => {
    const response = await fetch(`${API_BASE_URL}/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meeting),
    });
    if (!response.ok) throw new Error('Failed to create meeting');
    return response.json();
  },

  /**
   * Update an existing meeting
   */
  updateMeeting: async (id: number, meeting: Partial<Meeting>): Promise<Meeting> => {
    const response = await fetch(`${API_BASE_URL}/meetings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meeting),
    });
    if (!response.ok) throw new Error(`Failed to update meeting ${id}`);
    return response.json();
  },

  /**
   * Get cost estimate for a meeting
   */
  getMeetingCost: async (id: number): Promise<MeetingCost> => {
    const response = await fetch(`${API_BASE_URL}/meetings/${id}/cost`);
    if (!response.ok) throw new Error(`Failed to fetch cost for meeting ${id}`);
    return response.json();
  },

  /**
   * Get agenda suggestions based on meeting title
   */
  getAgendaSuggestions: async (title: string): Promise<AgendaSuggestion[]> => {
    const response = await fetch(`${API_BASE_URL}/suggestions/agenda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error('Failed to get agenda suggestions');
    return response.json();
  },
};

export default api;