// Calculate monthly mortgage payment using the PMT formula
const calculateMonthlyPayment = (
  principal: number,
  annualInterestRate: number,
  termYears: number
): number => {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  
  if (monthlyInterestRate === 0) return principal / numberOfPayments;
  
  const payment = principal * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  return payment;
};

// Calculate total interest paid over the life of the loan
const calculateTotalInterest = (
  monthlyPayment: number,
  termYears: number,
  principal: number
): number => {
  const totalPayments = monthlyPayment * termYears * 12;
  return totalPayments - principal;
};

export const calculateMortgage = (inputs: MortgageCalculatorInputs): MortgageCalculatorResults => {
  const depositAmount = (inputs.futureHomePrice * inputs.depositPercentage) / 100;
  const totalMortgageRequired = inputs.futureHomePrice - depositAmount;
  
  const primaryMortgageAmount = inputs.primaryMortgage.amount || totalMortgageRequired;
  const secondaryMortgageAmount = inputs.hasSecondMortgage ? inputs.secondaryMortgage.amount : 0;
  
  const primaryMonthlyPayment = calculateMonthlyPayment(
    primaryMortgageAmount,
    inputs.primaryMortgage.interestRate,
    inputs.primaryMortgage.termYears
  );
  
  const secondaryMonthlyPayment = inputs.hasSecondMortgage
    ? calculateMonthlyPayment(
        secondaryMortgageAmount,
        inputs.secondaryMortgage.interestRate,
        inputs.secondaryMortgage.termYears
      )
    : 0;
  
  const totalMonthlyPayment = primaryMonthlyPayment + secondaryMonthlyPayment;
  
  const primaryInterest = calculateTotalInterest(
    primaryMonthlyPayment,
    inputs.primaryMortgage.termYears,
    primaryMortgageAmount
  );
  
  const secondaryInterest = inputs.hasSecondMortgage
    ? calculateTotalInterest(
        secondaryMonthlyPayment,
        inputs.secondaryMortgage.termYears,
        secondaryMortgageAmount
      )
    : 0;
  
  const cashAfterRedemption = inputs.currentHousePrice - inputs.currentMortgageRemaining;
  const totalSavings = inputs.primaryApplicant.savings + 
    (inputs.secondaryApplicant?.savings || 0);
  const totalAvailableCash = cashAfterRedemption + totalSavings;

  const totalPurchaseFees = 
    inputs.purchaseFees.solicitorCost +
    inputs.purchaseFees.stampDuty +
    inputs.purchaseFees.estateAgentFees;

  const totalMonthlyBills = 
    inputs.monthlyBills.councilTax +
    inputs.monthlyBills.utilities +
    inputs.monthlyBills.insurance +
    inputs.monthlyBills.maintenance +
    inputs.monthlyBills.other;

  const totalMonthlySalary = 
    inputs.primaryApplicant.monthlySalaryAfterTax +
    (inputs.secondaryApplicant?.monthlySalaryAfterTax || 0);

  const monthlyDisposableIncome = 
    totalMonthlySalary - totalMonthlyPayment - totalMonthlyBills;

  return {
    depositAmount,
    totalMortgageRequired,
    primaryMortgageAmount,
    secondaryMortgageAmount,
    cashAfterRedemption,
    totalAvailableCash,
    primaryMonthlyPayment,
    secondaryMonthlyPayment,
    totalMonthlyPayment,
    totalInterestPaid: primaryInterest + secondaryInterest,
    totalPurchaseFees,
    totalMonthlyBills,
    monthlyDisposableIncome,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};