import React, { useState, useMemo, useEffect } from 'react';
import { Home } from 'lucide-react';
import { InputField } from './components/InputField';
import { MortgageDetails } from './components/MortgageDetails';
import { ResultCard } from './components/ResultCard';
import { PurchaseFees } from './components/PurchaseFees';
import { MonthlyBills } from './components/MonthlyBills';
import { ContributionSlider } from './components/ContributionSlider';
import { calculateMortgage, formatCurrency, calculateStampDuty } from './utils/calculations';
import type { MortgageCalculatorInputs } from './types/calculator';

function App() {

  const STORAGE_KEY = 'mortgageCalculatorState';

  const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  };
  
  const loadState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setInputs(JSON.parse(saved));
    }
  };
  

  const [inputs, setInputs] = useState<MortgageCalculatorInputs>({
    currentHousePrice: 0,
    currentMortgageRemaining: 0,
    primaryApplicant: {
      savings: 0,
      monthlySalaryAfterTax: 0,
      contributionRatio: 50
    },
    secondaryApplicant: {
      savings: 0,
      monthlySalaryAfterTax: 0,
      contributionRatio: 50
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
  ,isFirstTimeBuyer: false,
  isAdditionalProperty: false,
  isNonUKResident: false
  });

  const results = useMemo(() => calculateMortgage(inputs), [inputs]);
  
  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      purchaseFees: {
        ...prev.purchaseFees,
        stampDuty: calculateStampDuty(
          inputs.futureHomePrice,
          inputs.isFirstTimeBuyer,
          inputs.isAdditionalProperty,
          inputs.isNonUKResident
        )
      }
    }));
  }, [
    inputs.futureHomePrice, 
    inputs.isFirstTimeBuyer, 
    inputs.isAdditionalProperty, 
    inputs.isNonUKResident
  ]);

  const updateInput = (key: keyof MortgageCalculatorInputs, value: unknown) => {
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

        <div className="mt-8 flex flex-col items-center gap-4">
  <div className="mb-4">
    <button
      onClick={saveState}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mx-2">
      Save Configuration
    </button>
    <button
      onClick={loadState}
      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 mx-2">
      Load Saved Configuration
    </button>
  </div>
</div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Current Situation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Current situation</h2>
            <InputField
              label="Current house price"
              value={inputs.currentHousePrice}
              onChange={(value) => updateInput('currentHousePrice', value)}
              prefix="£"
            />
            <InputField
              label="Current mortgage remaining"
              value={inputs.currentMortgageRemaining}
              onChange={(value) => updateInput('currentMortgageRemaining', value)}
              prefix="£"
            />
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-4">Primary applicant</h3>
              <InputField
                label="Current savings"
                value={inputs.primaryApplicant.savings}
                onChange={(value) => updateInput('primaryApplicant', { ...inputs.primaryApplicant, savings: value })}
                prefix="£"
              />
              <InputField
                label="Monthly salary (after tax)"
                value={inputs.primaryApplicant.monthlySalaryAfterTax}
                onChange={(value) => updateInput('primaryApplicant', { ...inputs.primaryApplicant, monthlySalaryAfterTax: value })}
                prefix="£"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-4">Secondary applicant</h3>
              <InputField
                label="Current savings"
                value={inputs.secondaryApplicant.savings}
                onChange={(value) => updateInput('secondaryApplicant', { ...inputs.secondaryApplicant, savings: value })}
                prefix="£"
              />
              <InputField
                label="Monthly salary (after tax)"
                value={inputs.secondaryApplicant.monthlySalaryAfterTax}
                onChange={(value) => updateInput('secondaryApplicant', { ...inputs.secondaryApplicant, monthlySalaryAfterTax: value })}
                prefix="£"
              />
            </div>

            <div className="mt-6 overflow-hidden">
              <ContributionSlider
                primaryRatio={inputs.primaryApplicant.contributionRatio}
                onChange={(ratio) => {
                  setInputs((prev) => ({
                    ...prev,
                    primaryApplicant: {
                      ...prev.primaryApplicant,
                      contributionRatio: ratio
                    },
                    secondaryApplicant: {
                      ...prev.secondaryApplicant!,
                      contributionRatio: 100 - ratio
                    }
                  }));
                }}
              />
            </div>
          </div>

          {/* New Home Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">New home details</h2>
            <InputField
              label="Future home price"
              value={inputs.futureHomePrice}
              onChange={(value) => updateInput('futureHomePrice', value)}
              prefix="£"
            />
            <InputField
              label="Deposit percentage"
              value={inputs.depositPercentage}
              onChange={(value) => updateInput('depositPercentage', value)}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
            />
            
            <div className="mt-6 space-y-6">
              <MortgageDetails
                title="Primary mortgage"
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
                  Include second mortgage
                </label>
              </div>
              
              {inputs.hasSecondMortgage && (
                <MortgageDetails
                  title="Secondary mortgage"
                  values={inputs.secondaryMortgage}
                  onChange={(values) => updateInput('secondaryMortgage', values)}
                />
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">

  <h2 className="text-lg font-semibold text-gray-900 mb-6">Purchase fees</h2>
  <div className="space-y-2 mb-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="isFirstTimeBuyer"
        checked={inputs.isFirstTimeBuyer}
        onChange={(e) => setInputs(prev => ({ ...prev, isFirstTimeBuyer: e.target.checked }))}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="isFirstTimeBuyer" className="ml-2 block text-sm text-gray-900">
        First-time buyer
      </label>
    </div>

    <div className="flex items-center">
      <input
        type="checkbox"
        id="isAdditionalProperty"
        checked={inputs.isAdditionalProperty}
        onChange={(e) => setInputs(prev => ({ ...prev, isAdditionalProperty: e.target.checked }))}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="isAdditionalProperty" className="ml-2 block text-sm text-gray-900">
        Additional property
      </label>
    </div>

    <div className="flex items-center">
      <input
        type="checkbox"
        id="isNonUKResident"
        checked={inputs.isNonUKResident}
        onChange={(e) => setInputs(prev => ({ ...prev, isNonUKResident: e.target.checked }))}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="isNonUKResident" className="ml-2 block text-sm text-gray-900">
        Non UK resident
      </label>
    </div>
    
  </div>

  <PurchaseFees
    values={inputs.purchaseFees}
    onChange={(values) => updateInput('purchaseFees', values)}
  />
  <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">Total purchase fees</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(results.totalPurchaseFees)}
                </p>
              </div>
</div>

            {/* Monthly Bills */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly bills</h2>
              <MonthlyBills
                values={inputs.monthlyBills}
                onChange={(values) => updateInput('monthlyBills', values)}
              />
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">Total monthly bills</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(results.totalMonthlyBills)}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500">Monthly disposable income</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(results.monthlyDisposableIncome)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ResultCard
            label="Required deposit"
            value={formatCurrency(results.depositAmount)}
          />
          <ResultCard
            label="Total mortgage required"
            value={formatCurrency(results.totalMortgageRequired)}
          />
          <ResultCard
            label="Primary monthly share"
            value={formatCurrency(results.primaryApplicantShare.monthlyPayment + results.primaryApplicantShare.monthlyBills)}
            description="Including mortgage and bills"
          />
          <ResultCard
            label="Secondary monthly share"
            value={formatCurrency(results.secondaryApplicantShare.monthlyPayment + results.secondaryApplicantShare.monthlyBills)}
            description="Including mortgage and bills"
          />
          <ResultCard
            label="Primary applicant purchase fees"
            value={formatCurrency(results.primaryApplicantShare.purchaseFees)}
          />
          <ResultCard
            label="Secondary applicant purchase fees"
            value={formatCurrency(results.secondaryApplicantShare.purchaseFees)}
          />
          <ResultCard
            label="Total monthly payment"
            value={formatCurrency(results.totalMonthlyPayment)}
          />
          <ResultCard
            label="Total interest paid"
            value={formatCurrency(results.totalInterestPaid)}
            description="Over the full mortgage terms"
          />
        </div>
      </div>
    </div>
  );
}

export default App;