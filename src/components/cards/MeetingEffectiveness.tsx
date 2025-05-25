import { ChartBarIcon } from '../icons/Icons';
import { useEffect, useRef } from 'react';

interface TrendPoint {
  date: string;
  score: number;
}

interface MeetingEffectivenessProps {
  score: number;
  trend: TrendPoint[];
  description: string;
}

export default function MeetingEffectiveness({
  score,
  trend,
  description
}: MeetingEffectivenessProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Chart dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 30;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Find min and max scores for scaling
    const scores = trend.map(point => point.score);
    const minScore = Math.min(...scores) - 10; // Leave some space below
    const maxScore = Math.max(...scores) + 10; // Leave some space above
    const range = maxScore - minScore;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw Y axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    
    // Y-axis labels
    [100, 50, 0, -50, -100].forEach(value => {
      const y = padding + (maxScore - value) / range * chartHeight;
      ctx.fillText(value.toString(), padding - 5, y + 3);
      
      // Draw horizontal grid line
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    });
    
    // Draw X axis labels
    trend.forEach((point, index) => {
      const x = padding + (index / (trend.length - 1)) * chartWidth;
      ctx.fillText(point.date, x, height - padding + 15);
    });
    
    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    
    trend.forEach((point, index) => {
      const x = padding + (index / (trend.length - 1)) * chartWidth;
      const y = padding + (maxScore - point.score) / range * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw data points
    trend.forEach((point, index) => {
      const x = padding + (index / (trend.length - 1)) * chartWidth;
      const y = padding + (maxScore - point.score) / range * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }, [trend]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-full bg-gray-100 p-1.5">
          <ChartBarIcon className="h-4 w-4 text-gray-600" />
        </div>
        <h3 className="text-sm font-medium text-gray-600">Meeting Effectiveness Score</h3>
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold">{score}</p>
        <p className="text-sm text-gray-600 mt-1">
          {description}
        </p>
      </div>

      <div className="mt-4 h-40">
        <canvas ref={canvasRef} width="300" height="160" className="w-full h-full" />
      </div>
    </div>
  );
}