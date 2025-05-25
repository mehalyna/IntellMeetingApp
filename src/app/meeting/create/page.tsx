'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MeetingDetails from '@/components/MeetingDetails';
import Participants from '@/components/Participants';
import MeetingAgenda from '@/components/MeetingAgenda';
import CostEstimate from '@/components/CostEstimate';
import AISuggestions from '@/components/AISuggestions';
import Footer from '@/components/Footer';

export default function CreateMeeting() {
  const [title, setTitle] = useState('');
  
  const handleSaveDraft = () => {
    console.log('Saving draft...');
    alert('Draft saved successfully!');
  };
  
  const handleSendInvite = () => {
    console.log('Sending invite...');
    alert('Invite sent successfully!');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Main content column */}
            <div className="col-span-12 lg:col-span-8">
              {/* Meeting Details with Participants */}
              <MeetingDetails initialTitle={title} />
              <Participants />
              
              {/* Meeting Agenda */}
              <MeetingAgenda />
              
              {/* Cost Estimate */}
              <CostEstimate />
            </div>
            
            {/* Sidebar column */}
            <div className="col-span-12 lg:col-span-4">
              <AISuggestions />
            </div>
          </div>
        </div>
      </main>
      
      <Footer 
        onSaveDraft={handleSaveDraft}
        onSendInvite={handleSendInvite}
      />
    </div>
  );
}