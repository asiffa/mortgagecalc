import React from 'react';

interface ContributionSliderProps {
  primaryRatio: number;
  onChange: (primaryRatio: number) => void;
}

export const ContributionSlider: React.FC<ContributionSliderProps> = ({
  primaryRatio,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {/* <h3 className="text-md font-medium text-gray-700">Split:</h3> */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 w-24">Applicant 1: {primaryRatio}%</span>
        <input
          type="range"
          min="0"
          max="100"
          value={primaryRatio}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-600 w-24">Applicant 2: {100 - primaryRatio}%</span>
      </div>  
    </div>
  );
};