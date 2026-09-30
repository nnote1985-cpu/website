export function monthlyPayment(principal, annualRate, years) {
  if (![principal, annualRate, years].every(Number.isFinite) || principal < 0 || annualRate < 0 || years <= 0) return 0;
  const months = years * 12;
  const rate = annualRate / 1200;
  if (rate === 0) return principal / months;
  return principal * rate / (1 - Math.pow(1 + rate, -months));
}

export function affordableLoan(income, annualRate, years) {
  if (!Number.isFinite(income) || income < 0) return 0;
  const unitPayment = monthlyPayment(1, annualRate, years);
  return unitPayment > 0 ? income * 0.35 / unitPayment : 0;
}
