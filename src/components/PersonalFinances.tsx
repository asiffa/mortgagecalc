import React from 'react';
import { InputField } from './InputField';
import type { PersonalFinances as PersonalFinancesType } from '../types/calculator';

interface PersonalFinancesProps {
  title: string;
  values: PersonalFinancesType;
  onChange: (values: PersonalFinancesType) => void;
}

export const PersonalFinances: React.FC<PersonalFinancesProps> = ({
  title,
  values,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-700">{title}</h3>
      <InputField
        label="Current Savings"
        value={values.savings}
        onChange={(value) => onChange({ ...values, savings: value })}
        prefix="£"
      />
      <InputField
        label="Monthly Salary (After Tax)"
        value={values.monthlySalaryAfterTax}
        onChange={(value) => onChange({ ...values, monthlySalaryAfterTax: value })}
        prefix="£"
      />
    </div>
  );
};