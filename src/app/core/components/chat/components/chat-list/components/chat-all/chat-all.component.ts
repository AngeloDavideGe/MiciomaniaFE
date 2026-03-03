import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { ChangePicCustomComponent } from '../../../../../../../shared/components/custom/change-pic-custom.component';
import { effectTimeoutCustom } from '../../../../../../../shared/functions/utilities.function';
import { DataHttp } from '../../../../../../api/http.data';
import { Gruppo, LastMess } from '../../../../interfaces/chat.interface';
import { ChatService } from '../../../../services/chat.service';
import {
  FiltriInterface,
  GetFiltriCustom,
} from '../../../../../../../shared/utilities/functions/pagination.utilities';

@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, ChangePicCustomComponent],
  templateUrl: './chat-all.component.html',
  styleUrl: './chat-all.component.scss',
})
export class ChatAllComponent implements OnInit {
  public chatService = inject(ChatService);

  public editGruppoPic = signal<boolean>(false);
  public searchTerm = signal<string>('');
  private debounce = signal<string>('');

  public filtri: FiltriInterface<Gruppo> = {} as FiltriInterface<Gruppo>;

  @Input() allGruppi!: Gruppo[];
  @Input() allGruppiRecord!: Record<number, LastMess>;
  @Output() apriGruppo = new EventEmitter<number>();

  constructor() {
    effectTimeoutCustom(this.searchTerm, (value: string) =>
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
