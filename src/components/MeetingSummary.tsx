import { useState } from 'react';
import { CheckCircleIcon, WarningCircleIcon, XCircleIcon, VislyLogo, XIcon } from './icons/Icons';

// Define types for agenda items
type AgendaItemStatus = 'covered' | 'partially covered' | 'uncovered';

interface AgendaItem {
  title: string;
  status: AgendaItemStatus;
}

interface MeetingSummaryProps {
  completionPercentage: number;
  agendaItems: AgendaItem[];
  onClose: () => void;
}

export default function MeetingSummary({ 
  completionPercentage, 
  agendaItems, 
  onClose 
}: MeetingSummaryProps) {
  // Determine icon based on status
  const getStatusIcon = (status: AgendaItemStatus) => {
    switch (status) {
      case 'covered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'partially covered':
        return <WarningCircleIcon className="h-5 w-5 text-amber-500" />;
      case 'uncovered':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Format the status badge text
  const getStatusBadge = (status: AgendaItemStatus) => {
    let badgeClass = "covered-badge";
    
    if (status === 'partially covered') {
      badgeClass = "partially-covered-badge";
    } else if (status === 'uncovered') {
      badgeClass = "uncovered-badge";
    }
    
    return (
      <span className={badgeClass}>
        {status}
      </span>
    );
  };

  return (
    <div className="meeting-summary-container">
      {/* Close button in top right */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <XIcon className="h-5 w-5" />
      </button>
      
      {/* Header */}
      <h2 className="text-xl font-semibold mb-2">
        Meeting Summary (Final {completionPercentage}%)
      </h2>
      <p className="text-gray-500 mb-6">
        Overview of agenda items based on coverage.
      </p>
      
      {/* Agenda items list */}
      <div className="space-y-4">
        {agendaItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(item.status)}
              <span className="ml-2">{item.title}</span>
            </div>
            {getStatusBadge(item.status)}
          </div>
        ))}
      </div>
      
      {/* Close button at bottom */}
      <div className="mt-8 flex justify-end">
        <button 
          onClick={onClose}
          className="close-button"
        >
          Close Summary
        </button>
      </div>
      
      {/* Footer attribution - as seen in mockup */}
      <div className="mt-6 pt-4 text-sm text-gray-400 flex items-center">
        Made with <VislyLogo className="h-5 ml-1" />
      </div>
    </div>
  );
}

