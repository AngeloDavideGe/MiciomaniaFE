import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormCustomComponent } from '../../../../../../../../library/components/form/form.component';
import { ModalCustomComponent } from '../../../../../../../../library/components/modal/modal.component';
import { handlerFunc } from '../../../../../../../../library/functions/handler.function';
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
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-crea-proposta',
  standalone: true,
  imports: [ModalCustomComponent, FormCustomComponent],
  templateUrl: './crea-proposta.component.html',
})
export class CreaPropostaComponent {
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
    genere: {
      titolo: 'Genere',
      validators: [Validators.required],
      tipo: 'Text',
      errorMessage: 'Genere Obbligatorio',
    },
    file: {
      titolo: 'File',
      validators: [Validators.required],
      tipo: 'File',
      errorMessage: 'Opera Obbligatoria',
      onChange: (x: File) => (this.currentFileLink = this.updateLinkByFile(x)),
      file: {
        previewUrl: null,
        allowedExtensions: ['pdf', 'mp3'],
        allowedTypes: [],
        accept: '',
      },
    },
    copertina: {
      titolo: 'Copertina',
      validators: [Validators.required],
      tipo: 'File',
      errorMessage: 'Copertina Obbligatoria',
      file: {
        previewUrl: null,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/pjpeg'],
        accept: 'image/*',
      },
    },
  };

  upload(event: any): void {
    let { proposta, file, basePath, copertina } =
      this.getPropostaPrePost(event);
    this.uploadFileHttp({ proposta, file, basePath, copertina });
    this.tornaAllaHome();
  }

  private getPropostaPrePost(event: any): ProposaPrePost {
    const tipo: PropostaTipo = this.propostaPrimo;
    const basePath: string = tipo.charAt(0).toUpperCase() + tipo.slice(1);

    const proposta: Proposta = {
      idUtente: this.userId,
      tipo: tipo,
      nome: event.nome,
      genere: event.genere,
      copertina: '',
      url: '',
    };

    return {
      proposta: proposta,
      file: event.file,
      basePath: basePath,
      copertina: event.copertina,
    } as ProposaPrePost;
  }

  private uploadFileHttp(p: ProposaPrePost): void {
    this.elementiUtenteService.propostaCaricata.set(false);

    handlerFunc({
      callHttp: () =>
        forkJoin({
          main: this.dropboxService.uploadFile(
            p.file,
            this.userId,
            p.basePath,
            this.currentFileLink,
          ),

          copertina: this.dropboxService.uploadFile(
            p.copertina,
            this.userId,
            'Copertine',
          ),
        }),
      switchMapCall: (res: { main: any; copertina: any }) => {
        p.proposta.url = res.main.url;
        p.proposta.copertina = res.copertina.url;

        return this.elementiUtenteService.postProposta(p.proposta);
      },
      mapCall: (data: Proposta) =>
        ({ mangaSong: data, tipo: data.tipo }) as PopostaNonExtend,
      finalizeCall: () => this.elementiUtenteService.propostaCaricata.set(true),
      nextCall: (data: PopostaNonExtend) => {
        this.elementiUtenteService.utenteParodie =
          this.elementiUtenteService.utenteParodie || ({} as UtenteParodie);

        if (data.tipo === 'manga' || data.tipo === 'mangaPrimo') {
          this.elementiUtenteService.utenteParodie.update((utente) => {
            utente = utente || ({} as UtenteParodie);
            utente.mangaUtente = data.mangaSong;
            return utente;
          });
        } else {
          this.elementiUtenteService.utenteParodie.update((utente) => {
            utente = utente || ({} as UtenteParodie);
            utente.canzoniUtente = data.mangaSong;
            return utente;
          });
        }
      },
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
