import React, { useState, useMemo } from 'react';
import { Home } from 'lucide-react';
import { InputField } from './components/InputField';
import { MortgageDetails } from './components/MortgageDetails';
import { ResultCard } from './components/ResultCard';
import { PurchaseFees } from './components/PurchaseFees';
import { MonthlyBills } from './components/MonthlyBills';
import { calculateMortgage, formatCurrency } from './utils/calculations';
import type { MortgageCalculatorInputs } from './types/calculator';

function App() {
  const [inputs, setInputs] = useState<MortgageCalculatorInputs>({
    currentHousePrice: 0,
    currentMortgageRemaining: 0,
    primaryApplicant: {
      savings: 0,
      monthlySalaryAfterTax: 0
    },
    secondaryApplicant: {
      savings: 0,
      monthlySalaryAfterTax: 0
    },
    futureHomePrice: 0,
    depositPercentage: 20,
    primaryMortgage: {
      amount: 0,
      interestRate: 3.5,
      termYears: 30,
    },
    hasSecondMortgage: false,
    secondaryMortgage: {
      amount: 0,
      interestRate: 4.5,
      termYears: 15,
    },
    purchaseFees: {
      solicitorCost: 0,
      stampDuty: 0,
      estateAgentFees: 0
    },
    monthlyBills: {
      councilTax: 0,
      utilities: 0,
      insurance: 0,
      maintenance: 0,
      other: 0
    }
  });

  const results = useMemo(() => calculateMortgage(inputs), [inputs]);

  const updateInput = (key: keyof MortgageCalculatorInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Home className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Mortgage Calculator</h1>
          <p className="mt-2 text-lg text-gray-600">
            Calculate your mortgage and see how much you can afford
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Current Situation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Situation</h2>
            <InputField
              label="Current House Price"
              value={inputs.currentHousePrice}
              onChange={(value) => updateInput('currentHousePrice', value)}
              prefix="£"
            />
            <InputField
              label="Current Mortgage Remaining"
              value={inputs.currentMortgageRemaining}
              onChange={(value) => updateInput('currentMortgageRemaining', value)}
              prefix="£"
            />
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-4">Primary Applicant</h3>
              <InputField
                label="Current Savings"
                value={inputs.primaryApplicant.savings}
                onChange={(value) => updateInput('primaryApplicant', { ...inputs.primaryApplicant, savings: value })}
                prefix="£"
              />
              <InputField
                label="Monthly Salary (After Tax)"
                value={inputs.primaryApplicant.monthlySalaryAfterTax}
                onChange={(value) => updateInput('primaryApplicant', { ...inputs.primaryApplicant, monthlySalaryAfterTax: value })}
                prefix="£"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-4">Secondary Applicant</h3>
              <InputField
                label="Current Savings"
                value={inputs.secondaryApplicant.savings}
                onChange={(value) => updateInput('secondaryApplicant', { ...inputs.secondaryApplicant, savings: value })}
                prefix="£"
              />
              <InputField
                label="Monthly Salary (After Tax)"
                value={inputs.secondaryApplicant.monthlySalaryAfterTax}
                onChange={(value) => updateInput('secondaryApplicant', { ...inputs.secondaryApplicant, monthlySalaryAfterTax: value })}
                prefix="£"
              />
            </div>
          </div>

          {/* New Home Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">New Home Details</h2>
            <InputField
              label="Future Home Price"
              value={inputs.futureHomePrice}
              onChange={(value) => updateInput('futureHomePrice', value)}
              prefix="£"
            />
            <InputField
              label="Deposit Percentage"
              value={inputs.depositPercentage}
              onChange={(value) => updateInput('depositPercentage', value)}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
            />
            
            <div className="mt-6 space-y-6">
              <MortgageDetails
                title="Primary Mortgage"
                values={inputs.primaryMortgage}
                onChange={(values) => updateInput('primaryMortgage', values)}
              />
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasSecondMortgage"
                  checked={inputs.hasSecondMortgage}
                  onChange={(e) => updateInput('hasSecondMortgage', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasSecondMortgage" className="ml-2 block text-sm text-gray-900">
                  Include Second Mortgage
                </label>
              </div>
              
              {inputs.hasSecondMortgage && (
                <MortgageDetails
                  title="Secondary Mortgage"
                  values={inputs.secondaryMortgage}
                  onChange={(values) => updateInput('secondaryMortgage', values)}
                />
              )}
            </div>
          </div>

          {/* Purchase Fees & Monthly Bills */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Purchase Fees</h2>
              <PurchaseFees
                values={inputs.purchaseFees}
                onChange={(values) => updateInput('purchaseFees', values)}
              />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">Total Purchase Fees</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(results.totalPurchaseFees)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Bills</h2>
              <MonthlyBills
                values={inputs.monthlyBills}
                onChange={(values) => updateInput('monthlyBills', values)}
              />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">Total Monthly Bills</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(results.totalMonthlyBills)}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">Monthly Disposable Income</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(results.monthlyDisposableIncome)}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Results</h2>
            <div className="space-y-6">
              <ResultCard
                label="Required Deposit"
                value={formatCurrency(results.depositAmount)}
              />
              <ResultCard
                label="Total Mortgage Required"
                value={formatCurrency(results.totalMortgageRequired)}
              />
              <ResultCard
                label="Primary Mortgage Amount"
                value={formatCurrency(results.primaryMortgageAmount)}
              />
              {inputs.hasSecondMortgage && (
                <ResultCard
                  label="Secondary Mortgage Amount"
                  value={formatCurrency(results.secondaryMortgageAmount)}
                />
              )}
              <ResultCard
                label="Primary Monthly Payment"
                value={formatCurrency(results.primaryMonthlyPayment)}
              />
              {inputs.hasSecondMortgage && (
                <ResultCard
                  label="Secondary Monthly Payment"
                  value={formatCurrency(results.secondaryMonthlyPayment)}
                />
              )}
              <ResultCard
                label="Total Monthly Payment"
                value={formatCurrency(results.totalMonthlyPayment)}
              />
              <ResultCard
                label="Cash After Current House Sale"
                value={formatCurrency(results.cashAfterRedemption)}
              />
              <ResultCard
                label="Total Available Cash"
                value={formatCurrency(results.totalAvailableCash)}
              />
              {/* <ResultCard
                label="Total Interest Paid"
                value={formatCurrency(results.totalInterestPaid)}
                description="Over the full mortgage terms"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;