import { CheckCircleIcon, WarningCircleIcon, XCircleIcon } from '../icons/Icons';

interface AgendaItem {
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

interface AgendaCoverageProps {
  percentage: number;
  completedItems: number;
  partialItems: number;
  totalItems: number;
  agendaItems: AgendaItem[];
}

export default function AgendaCoverage({
  percentage,
  completedItems,
  partialItems,
  totalItems,
  agendaItems
}: AgendaCoverageProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-full bg-gray-100 p-1.5">
          <CheckCircleIcon className="h-4 w-4 text-gray-600" />
        </div>
        <h3 className="text-sm font-medium text-gray-600">Agenda Coverage</h3>
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold">{percentage}%</p>
        <p className="text-sm text-gray-600 mt-1">
          {completedItems} fully covered, {partialItems} partially covered out of {totalItems} items.
        </p>
      </div>

      <div className="mt-3 mb-4">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-400 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3 mt-5">
        {agendaItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.status === 'completed' ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : item.status === 'in-progress' ? (
              <WarningCircleIcon className="h-5 w-5 text-amber-500 flex-shrink-0" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
            )}
            <span className="text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}