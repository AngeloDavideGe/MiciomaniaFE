import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormCustomComponent } from '../../../../library/components/form/form.component';
import { RecordStruttura } from '../../../../library/interfaces/form.interface';
import { Validators } from '@angular/forms';
import { ModalCustomComponent } from '../../../../library/components/modal/modal.component';

@Component({
  selector: 'app-change-pic-custom',
  standalone: true,
  imports: [FormCustomComponent, ModalCustomComponent],
  template: `
    <app-modal-custom
      [title]="'Cambia Immagine'"
      [subtitle]="'Vietate foto di Colonvv'"
      [width]="'sm'"
      [showFooter]="false"
      (close)="chiudi.emit()"
    >
      <div bodyModal>
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
    </app-modal-custom>
  `,
})
export class ChangePicCustomComponent {
  @Input() nome!: string;
  @Output() chiudi = new EventEmitter();
  @Output() conferma = new EventEmitter<File | null>();

  public selectedFile = signal<File | null>(null);

  public strutturaForm: RecordStruttura = {
    imgProfilo: {
      titolo: 'Cambia Immagine',
      validators: [Validators.required],
      tipo: 'File',
      errorMessage: 'Immagine obbligatoria (jpg, jpeg o png)',
      file: {
        previewUrl: null,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/pjpeg'],
        accept: 'image/*',
      },
    },
  };
}
