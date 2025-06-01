import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { DropboxService } from '../services/dropbox.service';
import { fileValidator } from '../validators/proposta.validator';

@Component({
  selector: 'app-crea-proposta',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './crea-proposta.component.html',
})
export class CreaPropostaComponent implements OnInit {
  propostaForm!: FormGroup;
  isUploading = false;
  uploadError: string | null = null;
  uploadSuccess = false;

  private fb = inject(FormBuilder);
  private dropboxService = inject(DropboxService);

  @Input() userId!: string;
  @Output() chiudi = new EventEmitter<void>();

  get f() {
    return this.propostaForm.controls;
  }

  ngOnInit(): void {
    this.getDropboxToken();
    this.inizializzaForm();
  }

  private getDropboxToken(): void {
    if (!this.dropboxService.dropboxResponse.access_token) {
      this.dropboxService
        .getDropboxToken()
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.dropboxService.dropboxResponse = response;
            sessionStorage.setItem(
              'dropbox_access_token',
              response.access_token
            );
          },
          error: (err) => {
            console.error('Errore ottenimento token Dropbox:', err);
          },
        });
    }
  }

  private inizializzaForm(): void {
    this.propostaForm = this.fb.group({
      id_utente: [this.userId || ''],
      tipo: ['', Validators.required],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descrizione: ['', [Validators.required, Validators.maxLength(500)]],
      file: [null, [Validators.required, fileValidator]],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.propostaForm.patchValue({
        file: file,
      });
      this.propostaForm.get('file')?.updateValueAndValidity();
    }
  }

  upload(): void {
    const file = this.propostaForm.get('file')?.value;
    if (!file || !(file instanceof File)) {
      this.uploadError = 'Seleziona un file valido';
      return;
    }

    this.dropboxService
      .uploadFile(file, 'Manga', this.userId)
      .pipe(
        take(1)
        // switchMap((uploadResponse) => {
        //   const filePath = uploadResponse.path_lower;
        //   return this.dropboxService.getPermanentLink(filePath);
        // })
      )
      .subscribe({
        next: (permanentLink) => {
          console.log('Upload completato, link permanente:', permanentLink);
        },
        error: (err) => {
          console.error('Errore upload o recupero link:', err);
        },
      });
  }
  onCopertinaSelected(event: Event): void {}
}
