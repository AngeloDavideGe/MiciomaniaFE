import { Pipe, PipeTransform } from '@angular/core';
import { mesi } from '../constants/utility.constant';

type DateFormatType = 'dd mmmm yyyy' | 'dd/mm/yyyy' | 'dd mmmm yyyy hh:mm';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | null | undefined,
    format: DateFormatType = 'dd mmmm yyyy',
  ): string {
    return dateFormat(value, format);
  }
}

export function dateFormat(
  value: Date | string | null | undefined,
  format: DateFormatType = 'dd mmmm yyyy',
): string {
  if (!value) return '';

  const date = typeof value === 'string' ? new Date(value) : value;

  if (isNaN(date.getTime())) return 'Data non disponibile';

  const giorni: number = date.getDate();
  const meseIndex: number = date.getMonth();
  const anno: number = date.getFullYear();

  const ore: number = date.getHours();
  const minuti: number = date.getMinutes();

  switch (format) {
    case 'dd/mm/yyyy':
      return `${giorni.toString().padStart(2, '0')}/${(meseIndex + 1)
        .toString()
        .padStart(2, '0')}/${anno}`;

    case 'dd mmmm yyyy':
      return `${giorni} ${mesi[meseIndex]} ${anno}`;

    case 'dd mmmm yyyy hh:mm':
      return `${giorni} ${mesi[meseIndex]} ${anno} ${ore
        .toString()
        .padStart(2, '0')}:${minuti.toString().padStart(2, '0')}`;

    default:
      return `${giorni} ${mesi[meseIndex]} ${anno}`;
  }
}
