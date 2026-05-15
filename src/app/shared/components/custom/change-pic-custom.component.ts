import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormCustomComponent } from '../../../../library/components/form/form.component';
import { RecordStruttura } from '../../../../library/interfaces/form.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-change-pic-custom',
  standalone: true,
  imports: [FormCustomComponent],
  template: `
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header elementi-laterali border-bottom-0 pb-0">
            <h5 class="modal-title mb-0">
              {{ 'Modifica Immagine ' + nome }}
            </h5>
            <button
              type="button"
              class="btn-close"
              (click)="chiudi.emit()"
              aria-label="Close"
            ></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body pt-0 mt-2">
            <nav class="mb-4">
              <div
                class="nav nav-tabs border-bottom-0"
                id="nav-tab"
                role="tablist"
              >
                <div
                  class="container elemento-centrato flex-column"
                  style="min-height: 60vh; max-width: 400px; margin: 3rem auto; background: #f8f9fa; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2rem;"
                >
                  <app-form-custom
                    [strutturaForm]="strutturaForm"
                    [visualizzaPulsanti]="false"
                    (subscribeForm)="this.selectedFile.set($event.imgProfilo)"
                  ></app-form-custom>

                  <button
                    class="btn btn-primary w-100"
                    style="border-radius: 30px; font-weight: 500;"
                    [disabled]="!this.selectedFile()"
                    (click)="conferma.emit(this.selectedFile())"
                  >
                    {{ 'Carica Immagine' }}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChangePicCustomComponent {
  @Input() nome!: string;
  @Output() chiudi = new EventEmitter();
  @Output() conferma = new EventEmitter<File | null>();

  public selectedFile = signal<File | null>(null);

  public strutturaForm: RecordStruttura = {
    imgProfilo: {
      titolo: 'Cambia Immagine Profilo',
      validators: [Validators.required],
      tipo: 'File',
      // valueInit?: string;
      errorMessage: 'Immagine obbligatori',
      file: {
        previewUrl: null,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/pjpeg'],
        accept: 'image/*',
      },
    },
  };
}
