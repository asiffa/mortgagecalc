import React from 'react';
import { InputField } from './InputField';
import type { MonthlyBills as MonthlyBillsType } from '../types/calculator';

interface MonthlyBillsProps {
  values: MonthlyBillsType;
  onChange: (values: MonthlyBillsType) => void;
}

export const MonthlyBills: React.FC<MonthlyBillsProps> = ({ values, onChange }) => {
  return (
    <div className="space-y-4">
      <InputField
        label="Council tax"
        value={values.councilTax}
        onChange={(value) => onChange({ ...values, councilTax: value })}
        prefix="£"
      />
      <InputField
        label="Utilities"
        value={values.utilities}
        onChange={(value) => onChange({ ...values, utilities: value })}
        prefix="£"
      />
      <InputField
        label="Insurance"
        value={values.insurance}
        onChange={(value) => onChange({ ...values, insurance: value })}
        prefix="£"
      />
      <InputField
        label="Maintenance"
        value={values.maintenance}
        onChange={(value) => onChange({ ...values, maintenance: value })}
        prefix="£"
      />
      <InputField
        label="Food"
        value={values.food}
        onChange={(value) => onChange({ ...values, food: value })}
        prefix="£"
      />
      <InputField
        label="Other bills"
        value={values.other}
        onChange={(value) => onChange({ ...values, other: value })}
        prefix="£"
      />
    </div>
  );
};