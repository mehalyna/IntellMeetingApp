import { PaperAirplaneIcon } from '../icons/Icons';
import { useState } from 'react';

interface ProvideFeedbackProps {
  onSubmit?: (rating: number, isEffective: boolean, comments: string) => void;
}

export default function ProvideFeedback({ onSubmit }: ProvideFeedbackProps) {
  const [rating, setRating] = useState(5);
  const [isEffective, setIsEffective] = useState(false);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(rating, isEffective, comments);
    }
    // Reset form
    setRating(5);
    setIsEffective(false);
    setComments('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <h3 className="text-lg font-semibold mb-1">Provide Feedback</h3>
      <p className="text-sm text-gray-600 mb-4">
        Help us improve future meetings.
      </p>
      
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">
          On a scale of 0-10, how likely are you to recommend this meeting format?
        </p>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 (Not Likely)</span>
          <span>5</span>
          <span>10 (Very Likely)</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded text-amber-500 focus:ring-amber-500 border-gray-300"
            checked={isEffective}
            onChange={(e) => setIsEffective(e.target.checked)}
          />
          <span className="ml-2 text-sm">I found this meeting effective.</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Additional Comments:
        </label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Share your thoughts..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-sm font-medium rounded-md flex items-center justify-center gap-1 transition-colors"
      >
        <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        Submit Feedback
      </button>
    </div>
  );
}