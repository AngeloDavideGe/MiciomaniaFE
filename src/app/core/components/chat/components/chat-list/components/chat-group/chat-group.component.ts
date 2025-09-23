import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { User } from '../../../../../../../shared/interfaces/users.interface';
import { DataHttp } from '../../../../../../api/http.data';
import { getDropDown } from '../../../../functions/messaggi.function';
import { sendMessage, updateMessage } from '../../../../handlers/chat.handler';
import {
  DropDownAperta,
  IMessaggioComponent,
  Messaggio,
  ModificaInput,
  OutputDropdown,
  RispostaInput,
} from '../../../../interfaces/chat.interface';
import { ChatService } from '../../../../services/chat.service';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MessaggioComponent } from './components/messaggio/messaggio.component';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [MessaggioComponent, ChatInputComponent, DatePipe],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss',
})
export class ChatGroupComponent implements AfterViewInit, AfterViewChecked {
  private chatService = inject(ChatService);

  public user: User | null = DataHttp.user();
  private evitaSpam: boolean = true;
  private initialLoad: boolean = true;
  public currentDate: string = 'Oggi';
  public risposta = signal<RispostaInput | null>(null);
  public modifica = signal<ModificaInput | null>(null);
  public dropdownAperta = signal<DropDownAperta | null>(null);

  @Input() chatId!: number;
  @Input() messages!: Messaggio[];
  @Input() messaggiComp!: IMessaggioComponent[];
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;
  @ViewChildren('daySeparator') daySeparators!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentDate = entry.target.getAttribute('data-date') ?? '';
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    this.daySeparators.forEach((el: ElementRef) =>
      observer.observe(el.nativeElement)
    );
  }

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messages.length > 0) {
      this.scrollToBottom();
      setTimeout(() => (this.initialLoad = false), 200);
    }
  }

  public effectByChatList(): void {
    this.user = DataHttp.user();
    this.risposta.set(null);
    this.dropdownAperta.set(null);
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Errore durante lo scorrimento:', err);
    }
  }

  sendOrEditMessaggio(newMessaggio: ModificaInput): void {
    if (newMessaggio.idMessaggio) {
      updateMessage({
        chatService: this.chatService,
        id: newMessaggio.idMessaggio,
        content: newMessaggio.content,
      });
      this.modifica.set(null);
    } else {
      this.sendMessaggio(newMessaggio.content);
    }
  }

  private sendMessaggio(content: string): void {
    const lastMess: Messaggio = this.messages[this.messages.length - 1] || {};
    const lastDate: Date | null = lastMess.created_at
      ? lastMess.created_at
      : null;

    let separator: boolean =
      !lastDate ||
      this.messages.length === 0 ||
      new Date(lastDate).getDate() !== new Date().getDate();

    sendMessage({
      chatService: this.chatService,
      ifCond: this.evitaSpam,
      nextCall: () => this.evitaSpamFunc(),
      newMessage: content,
      risposta: this.risposta()?.idMessaggio || null,
      idChat: this.chatId,
      separator: separator,
    });
    this.risposta.set(null);
  }

  private evitaSpamFunc(): void {
    this.evitaSpam = false;
    this.initialLoad = true;
    setTimeout(() => (this.evitaSpam = true), 2000);
  }

  changeDropdown(event: OutputDropdown | null, messaggio: Messaggio): void {
    if (this.user && this.user.id && event) {
      const risposta: RispostaInput = {
        idMessaggio: messaggio.id,
        idUser: messaggio.sender,
        content: messaggio.content,
      };

      const modifica: ModificaInput = {
        idMessaggio: messaggio.id,
        content: messaggio.content,
      };

      const rispOrModifica: Function = (
        tipo: RispostaInput | ModificaInput
      ) => {
        if ('idUser' in tipo) {
          this.modifica.set(null);
          this.risposta.set(tipo);
        } else {
          this.risposta.set(null);
          this.modifica.set(tipo);
        }
      };

      const eliminaMessaggio: Function = () =>
        updateMessage({
          chatService: this.chatService,
          id: event.idMessaggio,
          content: '',
        });

      this.dropdownAperta.set({
        messaggioAperto: event.idMessaggio,
        dropdown: getDropDown({
          cond: this.user.id == event.idUser,
          rispondiFunc: () => rispOrModifica(risposta),
          modificaFunc: () => rispOrModifica(modifica),
          eliminaFunc: () => eliminaMessaggio(),
        }),
      } as DropDownAperta);
    }
  }
}
