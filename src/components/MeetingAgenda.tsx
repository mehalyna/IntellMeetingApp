import React from 'react';
import { LightBulbIcon } from './icons/Icons';
import useItemManager from '../hooks/useItemManager';

export interface AgendaItem {
  id: string;
  title: string;
  duration: number;
  presenter?: string;
}

interface MeetingAgendaProps {
  initialItems?: AgendaItem[];
  onAddItem?: (item: AgendaItem) => void;
  onUpdateItem?: (item: AgendaItem) => void;
  onDeleteItem?: (id: string) => void;
}

export default function MeetingAgenda({
  initialItems = [],
  onAddItem,
  onUpdateItem,
  onDeleteItem
}: MeetingAgendaProps) {
  const defaultAgendaItems = [
    { id: '1', title: 'Quick check-in', duration: 5 },
    { id: '2', title: 'Review Q3 Performance - Bob Johnson', duration: 15 },
    { id: '3', title: 'Discuss upcoming Marketing Strategy - Alice Smith', duration: 20 },
    { id: '4', title: 'Action Items & Next Steps', duration: 10 }
  ];
  
  const { items: agendaItems, addItem, updateItemField, deleteItem } = useItemManager<AgendaItem>({
    initialItems,
    defaultItems: defaultAgendaItems,
    onAdd: onAddItem,
    onUpdate: onUpdateItem,
    onDelete: onDeleteItem
  });

  const handleAddItem = () => {
    const newItem: AgendaItem = {
      id: Date.now().toString(),
      title: '',
      duration: 5
    };
    
    addItem(newItem);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Meeting Agenda</h2>
          <p className="text-sm text-gray-500">Outline discussion topics and goals. Suggestions may appear based on content.</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="space-y-1">
          {agendaItems.map((item, index) => (
            <div key={item.id} className="flex items-start group">
              <div className="mr-2 text-gray-500 text-sm font-medium mt-0.5">{index + 1}.</div>
              <div className="flex-grow">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    updateItemField(item.id, 'title', e.target.value);
                  }}
                  className="w-full bg-transparent border-none p-0 focus:outline-none text-sm"
                  placeholder="Add agenda item..."
                />
              </div>
              
              {index === 1 && (
                <div className="text-amber-500">
                  <LightBulbIcon className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-gray-500 italic">
          Looking good! Check the suggestions panel for more insights based on your agenda.
        </div>
      </div>
    </div>
  );
}