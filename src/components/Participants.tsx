import React from 'react';
import useItemManager from '../hooks/useItemManager';

export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'Host' | 'Presenter' | 'Attendee' | 'Optional';
  avatar?: string;
}

interface ParticipantsProps {
  initialParticipants?: Participant[];
  onAddParticipant?: (participant: Participant) => void;
  onUpdateParticipant?: (participant: Participant) => void;
}

export default function Participants({
  initialParticipants = [],
  onAddParticipant,
  onUpdateParticipant
}: ParticipantsProps) {
  const defaultParticipants: Participant[] = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      role: 'Host',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Presenter',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'Attendee',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
    },
    {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@example.com',
      role: 'Optional',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg'
    }
  ];
  
  const { items: participants, addItem, updateItemField } = useItemManager<Participant>({
    initialItems: initialParticipants,
    defaultItems: defaultParticipants,
    onAdd: onAddParticipant,
    onUpdate: onUpdateParticipant
  });

  const handleRoleChange = (id: string, role: Participant['role']) => {
    updateItemField(id, 'role', role);
  };

  const handleAddParticipant = () => {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: '',
      email: '',
      role: 'Attendee'
    };
    
    addItem(newParticipant);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Participants</h3>
      
      <div className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                {participant.avatar && (
                  <img 
                    src={participant.avatar} 
                    alt={participant.name} 
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="font-medium text-sm text-gray-800">{participant.name}</div>
                <div className="text-xs text-gray-500">{participant.email}</div>
              </div>
            </div>
            
            <div className="relative">
              <select
                value={participant.role}
                onChange={(e) => handleRoleChange(participant.id, e.target.value as Participant['role'])}
                className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              >
                <option value="Host">Host</option>
                <option value="Presenter">Presenter</option>
                <option value="Attendee">Attendee</option>
                <option value="Optional">Optional</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleAddParticipant}
        className="mt-4 w-full py-2 flex items-center justify-center text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
      >
        <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Participant
      </button>
    </div>
  );
}