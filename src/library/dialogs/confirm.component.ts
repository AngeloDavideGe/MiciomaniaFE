import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalCustomComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ModalCustomComponent],
  template: `
    <app-modal-custom
      [title]="params.title"
      [subtitle]="params.message"
      [width]="'sm'"
      [showFooter]="true"
      [showBody]="false"
      [secondaryButtonText]="params.buttonNo"
      [primaryButtonText]="params.buttonSi"
      (close)="onClose(false)"
      (primaryAction)="onClose(true)"
      (secondaryAction)="onClose(false)"
    ></app-modal-custom>
  `,
})
export class ConfirmComponent {
  private resultSubject = new Subject<boolean>();
  @Input() params!: ConfirmParams;

  getResultObservable() {
    return this.resultSubject.asObservable();
  }

  onClose(result: boolean): void {
    this.resultSubject.next(result);
    this.resultSubject.complete();
  }
}

export interface ConfirmParams {
  title: string;
  message: string;
  buttonNo: string;
  buttonSi: string;
}
