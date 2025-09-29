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
import { DataHttp } from '../../../../../../../core/api/http.data';
import {
  ElementiUtente,
  Proposta,
} from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../../../shared/services/api/elementiUtente.service';
import { ProposaPrePost } from '../../interfaces/dropbox.interface';
import { DropboxService } from '../../services/dropbox.service';
import { fileValidator } from '../../validators/proposta.validator';
import { ElemLang } from '../../languages/interfaces/elem-lang.interface';
@Component({
  selector: 'app-crea-proposta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crea-proposta.component.html',
})
export class CreaPropostaComponent implements OnInit {
  public propostaForm!: FormGroup;
  public optionManga: boolean = false;
  public optionCanzone: boolean = false;

  private fb = inject(FormBuilder);
  private dropboxService = inject(DropboxService);
  private elementiUtenteService = inject(ElementiUtenteService);

  @Input() elemLang!: ElemLang;
  @Input() userId!: string;
  @Input() tornaAllaHome!: Function;
  @Output() chiudi = new EventEmitter<void>();

  get f() {
    return this.propostaForm.controls;
  }

  ngOnInit(): void {
    this.setProposteDisponibili();
    this.getDropboxToken();
    this.inizializzaForm();
  }

  private setProposteDisponibili(): void {
    const elemUtente: ElementiUtente =
      DataHttp.elementiUtente || ({} as ElementiUtente);
    this.optionManga = !!elemUtente.manga.id_autore;
    this.optionCanzone = !!elemUtente.canzone.id_autore;
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
    const tipo: string = this.propostaForm.get('tipo')?.value || '';
    const basePath: string = tipo.charAt(0).toUpperCase() + tipo.slice(1);

    const proposta: Proposta = {
      id_autore: this.userId,
      tipo: tipo,
      nome: this.propostaForm.get('nome')?.value,
      genere: this.propostaForm.get('descrizione')?.value,
      copertina: '',
      link: '',
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
      .uploadFile(p.file, p.basePath, this.userId)
      .pipe(
        take(1),
        switchMap((res) => {
          p.proposta.link = res;
          return this.elementiUtenteService.postProposta(p.proposta);
        }),
        finalize(() => (this.elementiUtenteService.propostaCaricata = true))
      )
      .subscribe({
        next: (data: Proposta) =>
          (DataHttp.elementiUtente = {
            ...(DataHttp.elementiUtente || ({} as ElementiUtente)),
            proposta: data,
          }),
        error: (err) => console.error('Errore upload o recupero link:', err),
      });
  }
}
