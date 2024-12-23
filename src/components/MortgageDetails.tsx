import React from 'react';
import { InputField } from './InputField';
import type { MortgageDetails as MortgageDetailsType } from '../types/calculator';

interface MortgageDetailsProps {
  title: string;
  values: MortgageDetailsType;
  onChange: (values: MortgageDetailsType) => void;
}

export const MortgageDetails: React.FC<MortgageDetailsProps> = ({
  title,
  values,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-700">{title}</h3>
      <InputField
        label="Amount"
        value={values.amount}
        onChange={(value) => onChange({ ...values, amount: value })}
        prefix="£"
      />
      <InputField
        label="Interest Rate"
        value={values.interestRate}
        onChange={(value) => onChange({ ...values, interestRate: value })}
        suffix="%"
        step={0.1}
      />
      <InputField
        label="Term Length"
        value={values.termYears}
        onChange={(value) => onChange({ ...values, termYears: value })}
        suffix="years"
        min={1}
        max={35}
      />
    </div>
  );
};