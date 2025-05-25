import React, { useState } from 'react';

interface MeetingDetailsProps {
  initialTitle?: string;
}

export default function MeetingDetails({ initialTitle = '' }: MeetingDetailsProps) {
  const [title, setTitle] = useState(initialTitle);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Meeting Details</h2>
        <p className="text-sm text-gray-500">Set the meeting title and manage participants.</p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="meetingTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Meeting Title
        </label>
        <input
          id="meetingTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Weekly Sync, Project Kickoff"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
        />
      </div>
    </div>
  );
}