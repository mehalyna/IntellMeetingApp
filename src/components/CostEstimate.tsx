import React from 'react';
import { CurrencyDollarIcon } from './icons/Icons';

interface CostEstimateProps {
  estimatedCost?: string;
  hourlyRate?: string;
}

export default function CostEstimate({ 
  estimatedCost = '$345.00',
  hourlyRate = 'per Hour'
}: CostEstimateProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">Estimated Cost {hourlyRate}</h2>
        
        <div className="flex items-center mt-4">
          <div className="text-red-500 mr-2">
            <CurrencyDollarIcon className="h-6 w-6" />
          </div>
          <span className="text-3xl font-bold text-gray-800">{estimatedCost}</span>
        </div>
        
        <div className="mt-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" 
              style={{ width: '70%' }} 
            />
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-3">
          Estimate based on participant roles and typical hourly rates. Higher cost may suggest optimizing attendee list or duration.
        </p>
      </div>
    </div>
  );
}