import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalIndyComponent } from '../components/modal/modal-indy.component';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ModalIndyComponent],
  template: `
    <app-modal-indy
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
    ></app-modal-indy>
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
