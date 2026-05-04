// date-format.pipe.ts (versione estesa)
import { Pipe, PipeTransform } from '@angular/core';

type DateFormatType =
  | 'dd mmmm yyyy'
  | 'dd/mm/yyyy'
  | 'yyyy-mm-dd'
  | 'mmmm dd, yyyy';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | null | undefined,
    format: DateFormatType = 'dd mmmm yyyy',
  ): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) return 'Data non disponibile';

    const giorni: number = date.getDate();
    const meseIndex: number = date.getMonth();
    const anno: number = date.getFullYear();

    const mesi: string[] = [
      'gennaio',
      'febbraio',
      'marzo',
      'aprile',
      'maggio',
      'giugno',
      'luglio',
      'agosto',
      'settembre',
      'ottobre',
      'novembre',
      'dicembre',
    ];

    switch (format) {
      case 'dd/mm/yyyy':
        return `${giorni.toString().padStart(2, '0')}/${(meseIndex + 1).toString().padStart(2, '0')}/${anno}`;

      case 'yyyy-mm-dd':
        return `${anno}-${(meseIndex + 1).toString().padStart(2, '0')}-${giorni.toString().padStart(2, '0')}`;

      case 'mmmm dd, yyyy':
        return `${mesi[meseIndex]} ${giorni}, ${anno}`;

      case 'dd mmmm yyyy':
        return `${giorni} ${mesi[meseIndex]} ${anno}`;

      default:
        return `${giorni} ${mesi[meseIndex]} ${anno}`;
    }
  }
}
