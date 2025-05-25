import { MicrophoneIcon } from '../icons/Icons';
import { useEffect, useRef } from 'react';

interface ParticipantSpeakingTime {
  name: string;
  isOrganizer: boolean;
  minutes: number;
  color: string;
}

interface SpeakingParticipationProps {
  totalMinutes: number;
  participants: ParticipantSpeakingTime[];
}

export default function SpeakingParticipation({
  totalMinutes,
  participants
}: SpeakingParticipationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Calculate total speaking time
    const total = participants.reduce((sum, p) => sum + p.minutes, 0);
    
    // Start angle
    let startAngle = -0.5 * Math.PI; // Start at 12 o'clock
    
    // Draw the pie chart segments
    participants.forEach(participant => {
      const sliceAngle = (participant.minutes / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(100, 100); // Center of the circle
      ctx.arc(100, 100, 100, startAngle, startAngle + sliceAngle);
      ctx.fillStyle = participant.color;
      ctx.fill();
      
      startAngle += sliceAngle;
    });
    
    // Add inner white circle to create donut chart
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }, [participants]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-full bg-gray-100 p-1.5">
          <MicrophoneIcon className="h-4 w-4 text-gray-600" />
        </div>
        <h3 className="text-sm font-medium text-gray-600">Speaking Participation</h3>
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold">{totalMinutes} mins</p>
        <p className="text-sm text-gray-600 mt-1">
          Distribution of speaking time among key participants.
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative" style={{ width: '200px', height: '200px' }}>
          <canvas ref={canvasRef} width="200" height="200" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center">
            <div className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: participant.color }}></div>
            <span className={`text-sm ${participant.isOrganizer ? 'font-medium' : ''}`}>
              {participant.name} {participant.isOrganizer && '(Organizer)'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}