import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
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

@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, ChangePicCustomComponent],
  templateUrl: './chat-all.component.html',
  styleUrl: './chat-all.component.scss',
})
export class ChatAllComponent {
  public editGruppoPic = signal<boolean>(false);
  public chatService = inject(ChatService);

  @Input() allGruppi!: Gruppo[];
  @Input() allGruppiRecord!: Record<number, LastMess>;
  @Output() apriGruppo = new EventEmitter<number>();

  constructor() {
    effectTimeoutCustom(this.searchTerm, (value: string) =>
      this.debounce.set(value)
    );
  }

  public searchTerm = signal<string>('');
  private debounce = signal<string>('');

  public filteredGruppi = computed<Gruppo[]>(() => {
    const filtro: string = this.debounce();

    if (!filtro) {
      return this.allGruppi;
    } else {
      return this.allGruppi.filter((gruppo: Gruppo) =>
        gruppo.nome.toLowerCase().includes(filtro.toLowerCase())
      );
    }
  });

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
        finalize(() => this.chatService.aggiornamentoPic.set(0))
      )
      .subscribe({
        next: (url: string) => this.completeEdit(url),
        error: (err: Error) =>
          console.error('Errore durante il caricamento:', err),
      });
  }

  private completeEdit(url: string): void {
    let index: number = DataHttp.gruppiChat.listaGruppi.findIndex(
      (gruppo) => gruppo.id === this.chatService.aggiornamentoPic()
    );
    if (index !== -1) {
      DataHttp.gruppiChat.listaGruppi[index].pic = url;
    }
  }
}
