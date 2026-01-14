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
import { finalize, switchMap, take } from 'rxjs';
import {
  ProposaTipo,
  Proposta,
  UtenteParodie,
} from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../../../shared/services/api/elementiUtente.service';
import { ProposaPrePost } from '../../interfaces/dropbox.interface';
import { ElemLang } from '../../languages/interfaces/elem-lang.interface';
import { DropboxService } from '../../services/dropbox.service';
import { fileValidator } from '../../validators/proposta.validator';
@Component({
  selector: 'app-crea-proposta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crea-proposta.component.html',
})
export class CreaPropostaComponent implements OnInit {
  public propostaForm!: FormGroup;
  private currentFileLink: string = '';

  private fb = inject(FormBuilder);
  private dropboxService = inject(DropboxService);
  private elementiUtenteService = inject(ElementiUtenteService);

  @Input() parodieUtente!: UtenteParodie;
  @Input() elemLang!: ElemLang;
  @Input() userId!: string;
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
          next: (response) => (this.dropboxService.dropboxResponse = response),
          error: (err) =>
            console.error('Errore ottenimento token Dropbox:', err),
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
      const file: File = input.files[0];
      this.propostaForm.patchValue({
        file: file,
      });
      this.propostaForm.get('file')?.updateValueAndValidity();

      switch (file.type) {
        case 'application/pdf':
          if (this.parodieUtente.mangaUtente) {
            this.propostaForm.get('tipo')?.setValue('manga');
            this.currentFileLink = this.parodieUtente.mangaUtente.url;
          } else {
            this.propostaForm.get('tipo')?.setValue('mangaPrimo');
            this.currentFileLink = '';
          }
          break;
        case 'audio/mpeg':
          if (this.parodieUtente.canzoniUtente) {
            this.propostaForm.get('tipo')?.setValue('canzone');
            this.currentFileLink = this.parodieUtente.canzoniUtente.url;
          } else {
            this.propostaForm.get('tipo')?.setValue('canzonePrimo');
            this.currentFileLink = '';
          }
          break;
        default:
          this.currentFileLink = '';
          break;
      }
    }
  }

  upload(): void {
    let { proposta, file, basePath } = this.getPropostaPrePost();
    if (!this.controlloPrePost({ proposta, file, basePath })) return;
    this.uploadFileHttp({ proposta, file, basePath });
    this.tornaAllaHome();
  }

  private getPropostaPrePost(): ProposaPrePost {
    const file: File = this.propostaForm.get('file')?.value;
    const tipo: ProposaTipo = this.propostaForm.get('tipo')?.value || '';
    const basePath: string = tipo.charAt(0).toUpperCase() + tipo.slice(1);

    const proposta: Proposta = {
      idUtente: this.userId,
      tipo: tipo,
      nome: this.propostaForm.get('nome')?.value,
      genere: this.propostaForm.get('descrizione')?.value,
      copertina: '',
      url: '',
    };

    return {
      proposta: proposta,
      file: file,
      basePath: basePath,
    } as ProposaPrePost;
  }

  private controlloPrePost(p: ProposaPrePost): boolean {
    if (!this.dropboxService.dropboxResponse.access_token) {
      alert('Attendere un momento il caricamento per il file');
      return false;
    }

    if (p.basePath == 'Manga' && p.file.type !== 'application/pdf') {
      alert('Il tipo manga deve essere in formato pdf');
      return false;
    }

    if (p.basePath == 'Canzone' && p.file.type !== 'audio/mpeg') {
      alert('Il tipo canzone deve essere in formato mp3');
      return false;
    }

    return true;
  }

  private uploadFileHttp(p: ProposaPrePost): void {
    this.elementiUtenteService.propostaCaricata = false;
    this.dropboxService
      .uploadFile(p.file, this.userId, this.currentFileLink, p.basePath)
      .pipe(
        take(1),
        switchMap((res) => {
          p.proposta.url = res;
          return this.elementiUtenteService.postProposta(p.proposta);
        }),
        finalize(() => (this.elementiUtenteService.propostaCaricata = true))
      )
      .subscribe({
        next: (data: Proposta) => {
          /*inserire la risposta nel data http */
        },
        error: (err) => console.error('Errore upload o recupero link:', err),
      });
  }
}
