import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padZeroVolume',
  standalone: true,
})
export class PadZeroVolumePipe implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
