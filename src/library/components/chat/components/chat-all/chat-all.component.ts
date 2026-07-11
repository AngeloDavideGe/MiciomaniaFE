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
import { AppConfigService } from '../../../../../app/core/api/appConfig.service';
import { effectTimeoutCustom } from '../../../../functions/debounce.function';
import { GetFiltriCustom } from '../../../../functions/pagination.function';
import { Gruppo, LastMess } from '../../../../interfaces/chat.interface';
import { RecordStruttura } from '../../../../interfaces/form.interface';
import { FiltriInterface } from '../../../../interfaces/pagination.interface';
import { FormIndyComponent } from '../../../form/form-indy.component';
import { ModalIndyComponent } from '../../../modal/modal-indy.component';

@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    FormIndyComponent,
    ModalIndyComponent,
  ],
  templateUrl: './chat-all.component.html',
  styleUrl: './chat-all.component.scss',
})
export class ChatAllComponent implements OnInit {
  private configService = inject(AppConfigService);

  @Input() fullscreen: boolean = false;

  public editGruppoPic = signal<boolean>(false);
  public searchTerm = signal<string>('');
  private debounce = signal<string>('');
  public newProfilePic = signal<File | null>(null);
  public aggiornamentoPic = signal<number | null>(null);

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
  @Output() apriGruppo = new EventEmitter<Gruppo>();

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
}
