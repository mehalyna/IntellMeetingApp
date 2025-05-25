import { CalendarIcon, ClockIcon, UserGroupIcon } from './icons/Icons';

interface MeetingHeaderProps {
  title: string;
  date: string;
  timeRange: string;
  participants: number;
}

export default function MeetingHeader({ 
  title, 
  date, 
  timeRange, 
  participants 
}: MeetingHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-6 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" />
          <span>{timeRange}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <UserGroupIcon className="h-4 w-4" />
          <span>{participants} Participants</span>
        </div>
      </div>
    </div>
  );
}