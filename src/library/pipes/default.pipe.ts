// date-format.pipe.ts (versione estesa)
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DefaultPipe<T> implements PipeTransform {
  transform(value: T): T {
    return value;
  }
}
