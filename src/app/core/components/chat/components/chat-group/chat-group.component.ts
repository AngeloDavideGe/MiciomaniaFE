import {
  AfterViewChecked,
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { User } from '../../../../../shared/interfaces/users.interface';
import { DataHttp } from '../../../../api/http.data';
import { getDropDown } from '../../functions/messaggi.function';
import { mapUserMessage } from '../../functions/user-map.function';
import { loadMessages, sendMessage } from '../../handlers/chat.handler';
import {
  DropDownAperta,
  IMessaggioComponent,
  Messaggio,
  OutputDropdown,
  RispostaInput,
  UserReduced,
} from '../../interfaces/chat-group.interface';
import { ChatGroupService } from '../../services/chat-group.service';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { MessaggioComponent } from '../messaggio/messaggio.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [MessaggioComponent, ChatInputComponent],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss',
})
export class ChatGroupComponent implements OnInit, AfterViewChecked {
  private chatService = inject(ChatGroupService);

  private evitaSpam: boolean = true;
  private initialLoad: boolean = true;
  public user: User | null = null;
  public messaggioComp: IMessaggioComponent[] = [];
  public spinner = signal<boolean>(false);
  public risposta = signal<RispostaInput | null>(null);
  public dropdownAperta = signal<DropDownAperta | null>(null);
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );
  public messages: Signal<Messaggio[]> = computed(() => this.computedMessage());

  @Output() chiudiChat = new EventEmitter<void>();
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

  constructor() {
    effect(() => {
      this.user = DataHttp.user();
      this.risposta.set(null);
      this.dropdownAperta.set(null);
    });
  }

  ngOnInit(): void {
    loadMessages({
      chatService: this.chatService,
      chatId: '550e8400-e29b-41d4-a716-446655440000',
      ifCall: () => this.spinner.set(true),
      nextCall: () => {
        this.chatService.messaggiCaricatiBool = true;
        this.spinner.set(false);
      },
    });
  }

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messages().length > 0) {
      this.scrollToBottom();
      setTimeout(() => (this.initialLoad = false), 200);
    }
  }

  private computedMessage(): Messaggio[] {
    const messaggi: Messaggio[] = this.chatService.messages();
    const userMessageMap: Record<string, UserReduced> = this.userMessageMap();

    const messagesIdMap: Record<number, Messaggio> = {};
    const messaggioComp: IMessaggioComponent[] = [];
    const defaultPic: string = environment.defaultPic;

    for (const message of messaggi) {
      messagesIdMap[message.id] = message;

      let name: string;
      let urlPic: string;
      let class2: 'sent' | 'received';
      let replySender: string = '';
      let replyText: string = '';

      if (message.sender === this.user?.id) {
        name = `${this.user.credenziali?.nome} (${this.user.id})`;
        urlPic = this.user.credenziali.profilePic || defaultPic;
        class2 = 'sent';
      } else {
        const userInfo: UserReduced = userMessageMap[message.sender];

        if (userInfo) {
          name = `${userInfo.nome} (${message.sender})`;
          urlPic = userInfo.pic;
        } else {
          name = 'Utente Eliminato';
          urlPic = defaultPic;
        }
        class2 = 'received';
      }

      if (message.response && messagesIdMap[message.response]) {
        replySender = messagesIdMap[message.response].sender;
        replyText = messagesIdMap[message.response].content;
      }

      messaggioComp.push({
        message,
        name,
        urlPic,
        replySender,
        replyText,
        class2,
      });
    }

    this.messaggioComp = messaggioComp;

    return messaggi;
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Errore durante lo scorrimento:', err);
    }
  }

  sendMessaggio(newMessaggio: string) {
    sendMessage({
      chatService: this.chatService,
      ifCond: this.evitaSpam,
      nextCall: () => this.evitaSpamFunc(),
      newMessage: newMessaggio,
      risposta: this.risposta()?.idMessaggio || null,
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

      this.dropdownAperta.set({
        messaggioAperto: event.idMessaggio,
        dropdown: getDropDown({
          cond: this.user.id == event.idUser,
          rispondiFunc: () => this.risposta.set(risposta),
          eliminaFunc: () => console.log('Elimina'),
        }),
      } as DropDownAperta);
    }
  }
}
