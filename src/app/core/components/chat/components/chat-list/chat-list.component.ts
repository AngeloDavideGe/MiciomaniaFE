import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../../../../shared/interfaces/users.interface';
import { DataHttp } from '../../../../api/http.data';
import { mapUserMessage } from '../../functions/user-map.function';
import { loadMessages } from '../../handlers/chat.handler';
import {
  GruppiChat,
  Gruppo,
  IMessaggioComponent,
  LastMess,
  Messaggio,
  UserReduced,
} from '../../interfaces/chat-group.interface';
import { ChatService } from '../../services/chat.service';
import { ChatAllComponent } from './components/chat-all/chat-all.component';
import { ChatGroupComponent } from './components/chat-group/chat-group.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [ChatGroupComponent, ChatAllComponent],
  template: `
    @if(!spinner()){
    <!-- Lista delle Chat -->
    @if(!chatService.currentChat()){
    <div
      id="ChatHeader"
      class="d-flex align-items-center justify-content-between p-3"
    >
      <i class="bi bi-arrow-left fs-3" (click)="chiudiChat.emit()"></i>
      <h2 class="text-center flex-grow-1">Miciomania Chat</h2>
    </div>

    <app-chat-all
      [allGruppi]="allGruppi"
      [lastMessage]="lastMessage"
      (apriGruppo)="chatService.currentChat.set($event)"
    ></app-chat-all>
    }
    <!-- Chat Selezionata -->
    @else {

    <div
      id="ChatHeader"
      class="d-flex align-items-center justify-content-between p-3"
    >
      <i class="bi bi-arrow-left fs-3" (click)="loadComplete()"></i>
      <h2 class="text-center flex-grow-1">
        {{
          chatService.gruppiChat.listaGruppi[chatService.currentChat() || 0]
            .nome || 'N.B.'
        }}
      </h2>
    </div>

    <app-chat-group
      [chatId]="chatService.currentChat()!"
      [messages]="messages()"
      [messaggiComp]="messaggiComp"
    ></app-chat-group>
    } }
    <!-- Spinner -->
    @else {
    <div
      id="ChatHeader"
      class="d-flex align-items-center justify-content-between p-3"
    >
      <i class="bi bi-arrow-left fs-3" (click)="chiudiChat.emit()"></i>
      <h2 class="text-center flex-grow-1">Caricamento Chat Feline</h2>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div style="padding: 20px;">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    }
  `,
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent implements OnInit {
  public chatService = inject(ChatService);

  public user: User | null = null;
  public allGruppi: Gruppo[] = [];
  public lastMessage: Record<number, LastMess> = {};
  public spinner = signal<boolean>(false);
  public messaggiComp: IMessaggioComponent[] = [];
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );
  public messages: Signal<Messaggio[]> = computed(() => this.computedMessage());

  @Output() chiudiChat = new EventEmitter<void>();

  constructor() {
    effect(() => (this.user = DataHttp.user()));
  }

  ngOnInit(): void {
    if (this.chatService.messaggiCaricatiBool) {
      this.loadComplete();
    } else {
      this.spinner.set(true);
      loadMessages({
        chatService: this.chatService,
        nextCall: () => this.loadComplete(),
      });
    }
  }

  public loadComplete(): void {
    const gruppi: GruppiChat = this.chatService.gruppiChat;

    this.allGruppi = Object.values(gruppi.listaGruppi)
      .map((gruppo: Gruppo) => {
        const messaggi: Messaggio[] = gruppi.messaggi[gruppo.id];
        const lastMsg: Messaggio = messaggi[messaggi.length - 1];
        const orario = new Date(lastMsg.created_at);
        this.lastMessage[gruppo.id] = {
          content: lastMsg.content,
          orario,
        };
        return gruppo;
      })
      .sort((a: Gruppo, b: Gruppo) => {
        const mesA: Date = this.lastMessage[a.id].orario;
        const mesB: Date = this.lastMessage[b.id].orario;

        return mesA && mesB ? mesB.getTime() - mesA.getTime() : 0;
      });

    this.spinner.set(false);
    this.chatService.currentChat.set(null);
  }

  private computedMessage(): Messaggio[] {
    const currentChat: number = this.chatService.newMessaggiSignal();
    const userMessageMap: Record<string, UserReduced> = this.userMessageMap();
    const idChat: number | null = this.chatService.currentChat();

    if (!idChat) return [];

    const messaggi: Messaggio[] = this.chatService.gruppiChat.messaggi[idChat];
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

    this.messaggiComp = messaggioComp;

    return messaggi;
  }
}
