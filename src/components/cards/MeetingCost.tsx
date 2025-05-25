import { CurrencyDollarIcon } from '../icons/Icons';

interface MeetingCostProps {
  cost: string;
  participants: number;
  duration: number;
  hourlyRate: string;
}

export default function MeetingCost({
  cost,
  participants,
  duration,
  hourlyRate
}: MeetingCostProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-full bg-gray-100 p-1.5">
          <CurrencyDollarIcon className="h-4 w-4 text-gray-600" />
        </div>
        <h3 className="text-sm font-medium text-gray-600">Meeting Cost Reflection</h3>
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold">{cost}</p>
        <p className="text-sm text-gray-600 mt-1">
          Estimated cost based on {participants} participants, {duration} mins duration, and average hourly rate.
        </p>
      </div>
    </div>
  );
}