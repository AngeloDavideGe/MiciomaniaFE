import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber',
  standalone: true,
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    decimals: number = 2,
  ): string {
    return abbreviateNumberFormat(value, decimals);
  }
}

export function abbreviateNumberFormat(
  value: number | string | null | undefined,
  decimals: number = 2,
): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  let num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return String(value);
  }

  const isNegative = num < 0;
  num = Math.abs(num);

  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const result = num / unit.value;
      const formatted = formatNumber(result, decimals);
      return (isNegative ? '-' : '') + formatted + unit.symbol;
    }
  }

  return (isNegative ? '-' : '') + formatNumber(num, decimals);
}

function formatNumber(num: number, decimals: number): string {
  const rounded = Number(num.toFixed(decimals));

  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }

  return rounded.toFixed(decimals);
}
