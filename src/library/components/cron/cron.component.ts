import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { giorniSettimana, mesi } from '../../constants/utility.constant';
import { ModalCustomComponent } from '../modal/modal.component';
import {
  CronObbligatori,
  ErrorCronObbligatori,
} from '../../interfaces/cron.interface';

@Component({
  selector: 'app-cron-custom',
  standalone: true,
  imports: [ModalCustomComponent],
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.scss'],
})
export class CronCustomComponent {
  public selectedHours = signal<number[]>([]);
  public selectedDaysOfWeek = signal<number[]>([]);
  public selectedMonths = signal<number[]>([]);

  @Input() campiObbligatori: CronObbligatori = {};

  public currentCron = computed<string>(() => {
    const sh: number[] = this.selectedHours();
    const sm: number[] = this.selectedMonths();
    const sd: number[] = this.selectedDaysOfWeek();

    const min: string = '0';
    const hour: string = sh.length > 0 ? sh.join(',') : '*';
    const dayOfMonth: string = '*';
    const month: string = sm.length > 0 ? sm.join(',') : '*';
    const dayOfWeek: string = sd.length > 0 ? sd.join(',') : '*';

    return `${min} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  });

  public disableButton = computed<ErrorCronObbligatori>(() => {
    const cron: string[] = this.currentCron().split(' ');

    const hour: string = cron[1];
    const month: string = cron[3];
    const dayOfWeek: string = cron[4];

    const errorHour: boolean =
      this.campiObbligatori['hour'] == true && hour == '*';

    const errorMonth: boolean =
      this.campiObbligatori['month'] == true && month == '*';

    const errorDayWeek: boolean =
      this.campiObbligatori['dayOfWeek'] == true && dayOfWeek == '*';

    return {
      hour: errorHour,
      month: errorMonth,
      dayOfWeek: errorDayWeek,
      button: errorHour || errorMonth || errorDayWeek,
    };
  });

  @Output() invioStringaCron = new EventEmitter<string>();
  @Output() chiudiCron = new EventEmitter<void>();

  public readonly hours = Array.from({ length: 24 }, (_, i) => i);

  public readonly giorniSettimana = giorniSettimana.map((nome, index) => {
    const value = index === 6 ? 0 : index + 1;
    return {
      value: value,
      label: nome,
    };
  });

  public readonly mesiList = mesi.map((nome, index) => ({
    value: index + 1,
    label: nome,
  }));

  toggleHour(hour: number): void {
    this.selectedHours.update((hours: number[]) => {
      if (hours.includes(hour)) {
        return hours.filter((h: number) => h !== hour);
      } else {
        return [...hours, hour].sort((a: number, b: number) => a - b);
      }
    });
  }

  toggleDayOfWeek(day: number): void {
    this.selectedDaysOfWeek.update((days: number[]) => {
      if (days.includes(day)) {
        return days.filter((d: number) => d !== day);
      } else {
        return [...days, day].sort((a: number, b: number) => a - b);
      }
    });
  }

  toggleMonth(month: number): void {
    this.selectedMonths.update((months: number[]) => {
      if (months.includes(month)) {
        return months.filter((m: number) => m !== month);
      } else {
        return [...months, month].sort((a: number, b: number) => a - b);
      }
    });
  }

  resetSelections(): void {
    this.selectedHours.set([]);
    this.selectedDaysOfWeek.set([]);
    this.selectedMonths.set([]);
  }
}
