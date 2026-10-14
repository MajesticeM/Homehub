/**
 * South African Rand (ZAR) currency formatting utilities
 */

export function formatZAR(amount, options = {}) {
  const { showCents = false, suffix = '' } = options;
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return 'R 0' + (suffix ? ` ${suffix}` : '');
  }

  const num = Number(amount);
  const formatted = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(num);

  // Standardize "R 12,000" spacing
  const cleaned = formatted.replace('ZAR', 'R').trim();
  return suffix ? `${cleaned} ${suffix}` : cleaned;
}

export function parseCurrencyInput(value) {
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

export function calculateTotalMonthlyCost({
  monthlyRent = 0,
  electricity = 0,
  water = 0,
  internet = 0,
  parking = 0,
  otherRecurring = 0
}) {
  return (
    Number(monthlyRent || 0) +
    Number(electricity || 0) +
    Number(water || 0) +
    Number(internet || 0) +
    Number(parking || 0) +
    Number(otherRecurring || 0)
  );
}
