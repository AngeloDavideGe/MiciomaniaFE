import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { finalize, map, switchMap, take } from 'rxjs';

import { FormCustomComponent } from '../../../../../../../../library/components/form/form.component';
import { ModalCustomComponent } from '../../../../../../../../library/components/modal/modal.component';
import { RecordStruttura } from '../../../../../../../../library/interfaces/form.interface';
import {
  PopostaNonExtend,
  Proposta,
  PropostaTipo,
  UtenteParodie,
} from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../../../shared/services/api/elementiUtente.service';
import { ProposaPrePost } from '../../interfaces/dropbox.interface';
import { ElemLang } from '../../languages/interfaces/elem-lang.interface';
import { DropboxService } from '../../services/dropbox.service';

@Component({
  selector: 'app-crea-proposta',
  standalone: true,
  imports: [ModalCustomComponent, FormCustomComponent],
  templateUrl: './crea-proposta.component.html',
})
export class CreaPropostaComponent implements OnInit {
  private dropboxService = inject(DropboxService);
  private elementiUtenteService = inject(ElementiUtenteService);
  private currentFileLink: string = '';
  private propostaPrimo: PropostaTipo = {} as PropostaTipo;

  @Input() parodieUtente!: UtenteParodie;
  @Input() elemLang!: ElemLang;
  @Input() userId!: string;
  @Input() tornaAllaHome!: Function;
  @Output() chiudi = new EventEmitter<void>();

  public changePicForm: RecordStruttura = {
    nome: {
      titolo: 'Nome',
      validators: [Validators.required],
      tipo: 'Text',
      errorMessage: 'Nome Obbligatorio',
    },
    descrizione: {
      titolo: 'Descrizione',
      validators: [Validators.required],
      tipo: 'Textarea',
      errorMessage: 'Descrizione Obbligatoria',
    },
    file: {
      titolo: 'File',
      validators: [Validators.required],
      tipo: 'File',
      errorMessage: 'Opera Obbligatoria',
      onChange: (x: File) => {
        this.currentFileLink = this.updateLinkByFile(x);
      },
      file: {
        previewUrl: null,
        allowedExtensions: ['pdf', 'mp3'],
        allowedTypes: [],
        accept: '',
      },
    },
  };

  ngOnInit(): void {
    this.getDropboxToken();
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

  upload(event: any): void {
    let { proposta, file, basePath } = this.getPropostaPrePost(event);
    this.uploadFileHttp({ proposta, file, basePath });
    this.tornaAllaHome();
  }

  private getPropostaPrePost(event: any): ProposaPrePost {
    const file: File = event.file;
    const tipo: PropostaTipo = this.propostaPrimo;
    const basePath: string = tipo.charAt(0).toUpperCase() + tipo.slice(1);

    const proposta: Proposta = {
      idUtente: this.userId,
      tipo: tipo,
      nome: event.nome,
      genere: event.descrizione,
      copertina: '',
      url: '',
    };

    return {
      proposta: proposta,
      file: file,
      basePath: basePath,
    } as ProposaPrePost;
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
        map((data: Proposta) => {
          return { mangaSong: data, tipo: data.tipo } as PopostaNonExtend;
        }),
        finalize(() => (this.elementiUtenteService.propostaCaricata = true)),
      )
      .subscribe({
        next: (data: PopostaNonExtend) => {
          this.elementiUtenteService.utenteParodie =
            this.elementiUtenteService.utenteParodie || ({} as UtenteParodie);
          if (data.tipo === 'manga' || data.tipo === 'mangaPrimo') {
            this.elementiUtenteService.utenteParodie.update(
              (utente: UtenteParodie | null) => {
                utente = utente || ({} as UtenteParodie);
                utente.mangaUtente = data.mangaSong;
                return utente;
              },
            );
          } else {
            this.elementiUtenteService.utenteParodie.update(
              (utente: UtenteParodie | null) => {
                utente = utente || ({} as UtenteParodie);
                utente.canzoniUtente = data.mangaSong;
                return utente;
              },
            );
          }
        },
        error: (err) => console.error('Errore upload o recupero link:', err),
      });
  }

  private updateLinkByFile(file: File): string {
    switch (file.type) {
      case 'application/pdf':
        if (this.parodieUtente.mangaUtente) {
          this.propostaPrimo = 'manga';
          return this.parodieUtente.mangaUtente.url;
        } else {
          this.propostaPrimo = 'mangaPrimo';
          return '';
        }
      case 'audio/mpeg':
        if (this.parodieUtente.canzoniUtente) {
          this.propostaPrimo = 'canzone';
          return this.parodieUtente.canzoniUtente.url;
        } else {
          this.propostaPrimo = 'canzonePrimo';
          return '';
        }
      default:
        return '';
    }
  }
}
