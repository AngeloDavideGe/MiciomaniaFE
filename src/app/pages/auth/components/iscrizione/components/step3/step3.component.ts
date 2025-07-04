import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FormWizard } from '../../../../interfaces/wizard.interface';
import { LineeGuidaComponent } from './linee-guida/linee-guida.component';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [NgClass, LineeGuidaComponent],
  templateUrl: './step3.component.html',
})
export class Step3Component implements AfterViewInit, OnDestroy {
  public lineeGuidaAccettate = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  @Input() wizardData: FormWizard | null = null;
  @Output() lineeGuidaEvent = new EventEmitter<boolean>();

  ngAfterViewInit(): void {
    this.lineeGuidaAccettate
      .pipe(takeUntil(this.destroy$))
      .subscribe((accettate) => this.lineeGuidaEvent.emit(accettate));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return 'text-muted';
    switch (status) {
      case 'Attivo':
        return 'text-success';
      case 'Inattivo':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  }
}
