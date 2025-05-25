import { LightBulbIcon } from '../icons/Icons';

interface Suggestion {
  text: string;
  type: 'time' | 'agenda' | 'logistics';
}

interface ImprovementSuggestionsProps {
  suggestions: Suggestion[];
  description: string;
}

export default function ImprovementSuggestions({
  suggestions,
  description
}: ImprovementSuggestionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <h3 className="text-lg font-semibold mb-1">Improvement Suggestions</h3>
      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>
      
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              {suggestion.type === 'time' ? (
                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                </div>
              ) : suggestion.type === 'agenda' ? (
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>
              )}
            </div>
            <p className="text-sm">{suggestion.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}