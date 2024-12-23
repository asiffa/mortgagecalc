import React from 'react';
import { InputField } from './InputField';
import type { PurchaseFees as PurchaseFeesType } from '../types/calculator';

interface PurchaseFeesProps {
  values: PurchaseFeesType;
  onChange: (values: PurchaseFeesType) => void;
}

export const PurchaseFees: React.FC<PurchaseFeesProps> = ({ values, onChange }) => {
  return (
    <div className="space-y-4">
      <InputField
        label="Solicitor Cost"
        value={values.solicitorCost}
        onChange={(value) => onChange({ ...values, solicitorCost: value })}
        prefix="£"
      />
      <InputField
        label="Stamp Duty"
        value={values.stampDuty}
        onChange={(value) => onChange({ ...values, stampDuty: value })}
        prefix="£"
      />
      <InputField
        label="Estate Agent Fees"
        value={values.estateAgentFees}
        onChange={(value) => onChange({ ...values, estateAgentFees: value })}
        prefix="£"
      />
    </div>
  );
};