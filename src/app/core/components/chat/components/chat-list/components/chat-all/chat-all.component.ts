import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { effectTimeoutCustom } from '../../../../../../../../library/functions/debounce.function';
import { GetFiltriCustom } from '../../../../../../../../library/functions/pagination.function';
import { FiltriInterface } from '../../../../../../../../library/interfaces/pagination.interface';
import { AppConfigService } from '../../../../../../api/appConfig.service';
import { DataHttp } from '../../../../../../api/http.data';
import { Gruppo, LastMess } from '../../../../interfaces/chat.interface';
import { ChatService } from '../../../../services/chat.service';
import { FormCustomComponent } from '../../../../../../../../library/components/form/form.component';
import { ModalCustomComponent } from '../../../../../../../../library/components/modal/modal.component';
import { RecordStruttura } from '../../../../../../../../library/interfaces/form.interface';

@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    FormCustomComponent,
    ModalCustomComponent,
  ],
  templateUrl: './chat-all.component.html',
  styleUrl: './chat-all.component.scss',
})
export class ChatAllComponent implements OnInit {
  public chatService = inject(ChatService);
  private configService = inject(AppConfigService);

  public editGruppoPic = signal<boolean>(false);
  public searchTerm = signal<string>('');
  private debounce = signal<string>('');
  public newProfilePic = signal<File | null>(null);

  public filtri: FiltriInterface<Gruppo> = {} as FiltriInterface<Gruppo>;
  public readonly groupPic: string =
    this.configService.config.defaultPicsUrl.group;

  public changePicForm: RecordStruttura = {
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

  @Input() allGruppi!: Gruppo[];
  @Input() allGruppiRecord!: Record<number, LastMess>;
  @Output() apriGruppo = new EventEmitter<number>();

  constructor() {
    effectTimeoutCustom<string>(this.searchTerm, (value: string) =>
      this.debounce.set(value),
    );
  }

  ngOnInit(): void {
    this.filtri = GetFiltriCustom<Gruppo, null>({
      elemTable: signal<Gruppo[]>(this.allGruppi),
      select: [
        {
          key: 'nome',
          query: this.debounce,
        },
      ],
    });
  }

  apriCambioPic(chatId: number): void {
    this.editGruppoPic.set(true);
    this.chatService.aggiornamentoPic.set(chatId);
  }

  cambiaPic(file: File | null): void {
    this.editGruppoPic.set(false);
    this.chatService
      .uploadProfileImage(file as File, this.chatService.aggiornamentoPic())
      .pipe(
        take(1),
        finalize(() => this.chatService.aggiornamentoPic.set(0)),
      )
      .subscribe({
        next: (url: string) => this.completeEdit(url),
        error: (err: Error) =>
          console.error('Errore durante il caricamento:', err),
      });
  }

  private completeEdit(url: string): void {
    let index: number = DataHttp.gruppiChat.listaGruppi.findIndex(
      (gruppo) => gruppo.id === this.chatService.aggiornamentoPic(),
    );
    if (index !== -1) {
      DataHttp.gruppiChat.listaGruppi[index].pic = url;
    }
  }
}
