'use client';

import { useState } from 'react';
import MeetingSummary from '@/components/MeetingSummary';

export default function TestPage() {
  const [showSummary, setShowSummary] = useState(true);
  
  // Different test data to verify component flexibility
  const meetingData = {
    completionPercentage: 50,
    agendaItems: [
      { title: 'Introduction and Agenda Review', status: 'covered' as const },
      { title: 'Q1 Financial Results', status: 'covered' as const },
      { title: 'Marketing Campaign Status', status: 'partially covered' as const },
      { title: 'New Product Roadmap', status: 'uncovered' as const },
      { title: 'Team Structure Changes', status: 'uncovered' as const },
    ]
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Testing Meeting Summary Component</h1>
      
      {showSummary ? (
        <div className="w-full max-w-lg">
          <MeetingSummary 
            completionPercentage={meetingData.completionPercentage}
            agendaItems={meetingData.agendaItems}
            onClose={handleCloseSummary}
          />
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Summary closed</p>
          <button 
            onClick={handleShowSummary}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Meeting Summary
          </button>
        </div>
      )}
    </main>
  );
}