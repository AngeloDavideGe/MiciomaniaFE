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
import { switchMap, take } from 'rxjs';
import { DropboxService } from '../../services/dropbox.service';
import { fileValidator } from '../../validators/proposta.validator';
import { PropostaService } from '../../services/proposta.service';
import { ElementiUtenteService } from '../../../../../../../shared/services/elementiUtente.service';
import { Proposta } from '../../../../../../../shared/interfaces/elementiUtente.interface';

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
  private propostaService = inject(PropostaService);

  @Input() userId!: string;
  @Input() elementiUtenteService!: ElementiUtenteService;
  @Input() tornaAllaHome!: Function;
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
    const basePath = this.propostaForm.get('tipo')?.value;

    let proposta: Proposta = {
      id_autore: this.userId,
      tipo: this.propostaForm.get('tipo')?.value,
      nome: this.propostaForm.get('nome')?.value,
      genere: this.propostaForm.get('descrizione')?.value,
      copertina: '', // Placeholder, will be set after upload
      link: '', // Assuming the file name is used as identifier
    };

    this.dropboxService
      .uploadFile(file, basePath, this.userId)
      .pipe(
        take(1),
        switchMap((res) => {
          proposta.link = res;
          return this.propostaService.postProposta(proposta);
        })
      )
      .subscribe({
        next: (data) => {
          this.elementiUtenteService.elementiUtente.proposta = data;
          sessionStorage.setItem(
            'elementiUtente',
            JSON.stringify(this.elementiUtenteService.elementiUtente)
          );
        },
        error: (err) => {
          console.error('Errore upload o recupero link:', err);
        },
      });

    this.tornaAllaHome();
  }

  onCopertinaSelected(event: Event): void {}
}
