import React from 'react';
import { LightBulbIcon } from './icons/Icons';

interface Suggestion {
  id: string;
  text: string;
  type: 'participant' | 'agenda' | 'time' | 'general';
}

interface AISuggestionsProps {
  suggestions?: Suggestion[];
}

export default function AISuggestions({ 
  suggestions = [
    { 
      id: '1', 
      text: 'Review Optional attendee', 
      type: 'participant' 
    }
  ]
}: AISuggestionsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
      <div className="flex items-center mb-4">
        <div className="text-amber-500 mr-2">
          <LightBulbIcon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">AI Suggestions</h2>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id}
            className="flex items-start p-3 rounded-md bg-amber-50 border border-amber-100"
          >
            <div className="flex-shrink-0 text-amber-500 mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Suggestion:</span> {suggestion.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}