import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  template: `
    <div
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5); padding-top: 5%;"
    >
      <div
        class="modal-dialog"
        role="document"
        style="max-width: 500px; margin: 0 auto;"
      >
        <div
          class="modal-content"
          style="border: none; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15); border-radius: 10px; overflow: hidden;"
        >
          <!-- Header con bordo inferiore sottile e colore più moderno -->
          <div
            class="modal-header"
            style="background-color: white; color: #333; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e9ecef;"
          >
            <h5
              class="modal-title mb-0"
              style="font-size: 1.3rem; font-weight: 600;"
            >
              {{ params.title }}
            </h5>
            <button
              type="button"
              class="close ml-auto"
              aria-label="Close"
              (click)="onClose(false)"
              style="color: #6c757d; opacity: 0.7; font-size: 1.75rem; line-height: 1; background: transparent; border: none; transition: opacity 0.2s;"
              onmouseover="this.style.opacity='1'"
              onmouseout="this.style.opacity='0.7'"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- Body con più spazio e leggibilità migliorata -->
          <div
            class="modal-body"
            style="padding: 1.75rem 1.5rem; font-size: 1.05rem; line-height: 1.6; color: #495057;"
          >
            <p class="mb-0">{{ params.message }}</p>
          </div>

          <!-- Footer con bordi arrotondati e stile più pulito -->
          <div
            class="modal-footer"
            style="padding: 1rem 1.5rem; border-top: 1px solid #e9ecef; background-color: white;"
          >
            <button
              type="button"
              class="btn btn-light"
              (click)="onClose(false)"
              style="min-width: 90px; padding: 0.5rem 1rem; font-weight: 500; border-radius: 6px; border: 1px solid #dee2e6; transition: background-color 0.2s;"
              onmouseover="this.style.backgroundColor='#f8f9fa'"
              onmouseout="this.style.backgroundColor='white'"
            >
              {{ params.buttonNo }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="onClose(true)"
              style="min-width: 90px; padding: 0.5rem 1rem; font-weight: 500; border-radius: 6px; background-color: #4361ee; border: none; transition: background-color 0.2s; box-shadow: none;"
              onmouseover="this.style.backgroundColor='#3a56d4'"
              onmouseout="this.style.backgroundColor='#4361ee'"
            >
              {{ params.buttonSi }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmComponent {
  @Input() params!: ConfirmParams;

  private resultSubject = new Subject<boolean>();

  getResultObservable() {
    return this.resultSubject.asObservable();
  }

  onClose(result: boolean): void {
    this.resultSubject.next(result);
    this.resultSubject.complete();
  }
}

interface ConfirmParams {
  title: string;
  message: string;
  buttonNo: string;
  buttonSi: string;
}
