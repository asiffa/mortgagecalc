export interface PersonalFinances {
  savings: number;
  monthlySalaryAfterTax: number;
  contributionRatio: number; // New field
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
  // New fields for split costs
  primaryApplicantShare: {
    monthlyPayment: number;
    monthlyBills: number;
    purchaseFees: number;
  };
  secondaryApplicantShare: {
    monthlyPayment: number;
    monthlyBills: number;
    purchaseFees: number;
  };
}