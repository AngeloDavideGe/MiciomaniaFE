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
  ViewChild,
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
} from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';
import { ChatAllComponent } from './components/chat-all/chat-all.component';
import { ChatGroupComponent } from './components/chat-group/chat-group.component';
import {
  getMessaggioBenvenuto,
  getMessaggioCompBenvenuto,
} from '../../functions/messaggi.function';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [ChatGroupComponent, ChatAllComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent implements OnInit {
  public chatService = inject(ChatService);

  public user: User | null = null;
  public allGruppi: Gruppo[] = [];
  public allGruppiRecord: Record<number, LastMess> = {};
  public spinner = signal<boolean>(false);
  public messaggiComp: IMessaggioComponent[] = [];
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );
  public messages: Signal<Messaggio[]> = computed(() => this.computedMessage());

  @Output() chiudiChat = new EventEmitter<void>();
  @ViewChild(ChatGroupComponent) cgc!: ChatGroupComponent;

  constructor() {
    effect(() => {
      this.user = DataHttp.user();
      this.cgc ? this.cgc.effectByChatList() : null;
    });
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
    const gruppi: GruppiChat = DataHttp.gruppiChat;

    this.allGruppi = gruppi.listaGruppi
      .map((gruppo: Gruppo) => {
        const messaggi: Messaggio[] =
          gruppi.messaggi[gruppo.id] && gruppi.messaggi[gruppo.id].length > 0
            ? gruppi.messaggi[gruppo.id]
            : [getMessaggioBenvenuto()];

        const lastMsg: Messaggio = messaggi[messaggi.length - 1] || {};
        const orario = new Date(lastMsg.created_at || new Date());
        this.allGruppiRecord[gruppo.id] = {
          content: lastMsg.content,
          orario: orario,
          chat: gruppo.nome,
        };

        return gruppo;
      })
      .sort((a: Gruppo, b: Gruppo) => {
        const mesA: Date = this.allGruppiRecord[a.id].orario;
        const mesB: Date = this.allGruppiRecord[b.id].orario;

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

    let messaggi: Messaggio[] = DataHttp.gruppiChat.messaggi[idChat] || [];
    let messaggioComp: IMessaggioComponent[] = [];
    const messagesIdMap: Record<number, Messaggio> = {};
    const defaultPic: string = environment.defaultPic;

    if (messaggi.length !== 0) {
      messaggioComp = messaggi.map((message) => {
        messagesIdMap[message.id] = message;

        let name: string;
        let urlPic: string;
        let class2: 'sent' | 'received';
        let replySender: string = '';
        let replyText: string = '';

        if (message.sender === this.user?.id) {
          name = `${this.user.credenziali?.nome} (${this.user.id})`;
          urlPic = this.user.credenziali?.profilePic || defaultPic;
          class2 = 'sent';
        } else {
          const userInfo: UserReduced = userMessageMap[message.sender];
          name = userInfo
            ? `${userInfo.nome} (${message.sender})`
            : 'Utente Eliminato';
          urlPic = userInfo?.pic || defaultPic;
          class2 = 'received';
        }

        if (message.response && messagesIdMap[message.response]) {
          replySender = messagesIdMap[message.response].sender;
          replyText = messagesIdMap[message.response].content;
        }

        return {
          message,
          name,
          urlPic,
          replySender,
          replyText,
          class2,
        };
      });
    } else {
      messaggi = [getMessaggioBenvenuto()];
      messaggioComp = [getMessaggioCompBenvenuto(messaggi[0])];
    }

    this.messaggiComp = messaggioComp;

    return messaggi;
  }
}
