export interface PersonalFinances {
  savings: number;
  monthlySalaryAfterTax: number;
  contributionRatio: number;
}

export interface MortgageDetails {
  amount: number;
  interestRate: number;
  termYears: number;
}

export interface MonthlyBills {
  councilTax: number;
  utilities: number;
  insurance: number;
  maintenance: number;
  other: number;
}

export interface PurchaseFees {
  solicitorCost: number;
  stampDuty: number;
  estateAgentFees: number;
}

export interface MortgageCalculatorResults {
  depositAmount: number;
  totalMortgageRequired: number;
  primaryMortgageAmount: number;
  secondaryMortgageAmount: number;
  cashAfterRedemption: number;
  totalAvailableCash: number;
  primaryMonthlyPayment: number;
  secondaryMonthlyPayment: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPurchaseFees: number;
  totalMonthlyBills: number;
  monthlyDisposableIncome: number;
  primaryApplicantShare: {  
    savings: number;
    monthlySalaryAfterTax: number;
    monthlyPayment: number;
    monthlyBills: number;
    purchaseFees: number;
  };
  secondaryApplicantShare: {
    savings: number;
    monthlySalaryAfterTax: number;
    monthlyPayment: number;
    monthlyBills: number;
    purchaseFees: number;
  };
}

export interface MortgageCalculatorInputs {
  currentHousePrice: number;
  currentMortgageRemaining: number;
  primaryApplicant: PersonalFinances;
  secondaryApplicant: PersonalFinances;
  primaryApplicantSalary: number;
  secondaryApplicantSalary: number;
  primarySavings: number;
  secondarySavings: number;
  futureHomePrice: number;
  depositPercentage: number;
  primaryMortgage: MortgageDetails;
  hasSecondMortgage: boolean;
  secondaryMortgage: MortgageDetails;
  purchaseFees: PurchaseFees;
  monthlyBills: MonthlyBills;
  isFirstTimeBuyer: boolean;
  isAdditionalProperty: boolean;
  isNonUKResident: boolean;
}