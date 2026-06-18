import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter',
  standalone: true,
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    return capitalizeFirstLetter(value);
  }
}

export function capitalizeFirstLetter(value: string): string {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  } else {
    return '';
  }
}
