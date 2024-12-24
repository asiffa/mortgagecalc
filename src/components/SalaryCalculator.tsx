import React from 'react';

interface SalaryCalculatorProps {
  primarySalary: number;
  secondarySalary: number;
  totalBills: number;
}

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ primarySalary, secondarySalary, totalBills }) => {
  const totalSalary = primarySalary + secondarySalary;
  const moneyLeft = totalSalary - totalBills;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Salary and Bills</h2>
      <p>Total Salary: £{totalSalary.toFixed(2)}</p>
      <p>Total Bills: £{totalBills.toFixed(2)}</p>
      <p>Money Left: £{moneyLeft.toFixed(2)}</p>
    </div>
  );
};

export default SalaryCalculator;