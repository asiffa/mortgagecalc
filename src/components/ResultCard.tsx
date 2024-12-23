import React from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  description?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ label, value, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};