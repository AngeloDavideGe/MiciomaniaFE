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
import { ChatGroupComponent } from '../chat-group/chat-group.component';
import { ChatGroupService } from '../../services/chat-group.service';
import {
  IMessaggioComponent,
  Messaggio,
  UserReduced,
} from '../../interfaces/chat-group.interface';
import { mapUserMessage } from '../../functions/user-map.function';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../../../../shared/interfaces/users.interface';
import { DataHttp } from '../../../../api/http.data';
import { loadMessages } from '../../handlers/chat.handler';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [ChatGroupComponent],
  template: `
    <div
      id="ChatHeader"
      class="d-flex align-items-center justify-content-between p-3"
    >
      <i class="bi bi-arrow-left fs-3" (click)="chiudiChat.emit()"></i>
      <h2 class="text-center flex-grow-1">Miciomania Chat</h2>
    </div>

    @if(!spinner()){
    <app-chat-group
      [messages]="messages()"
      [messaggiComp]="messaggiComp"
    ></app-chat-group>
    } @else {
    <div class="chat-messages d-flex justify-content-center align-items-center">
      <div class="whatsapp-spinner">
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
  private chatService = inject(ChatGroupService);

  public user: User | null = null;
  public spinner = signal<boolean>(false);
  public messaggiComp: IMessaggioComponent[] = [];
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );
  public messages: Signal<Messaggio[]> = computed(() => this.computedMessage());

  constructor() {
    effect(() => (this.user = DataHttp.user()));
  }

  ngOnInit(): void {
    loadMessages({
      chatService: this.chatService,
      chatId: 1,
      ifCall: () => this.spinner.set(true),
      nextCall: () => {
        this.chatService.messaggiCaricatiBool = true;
        this.spinner.set(false);
      },
    });
  }

  @Output() chiudiChat = new EventEmitter<void>();

  private computedMessage(): Messaggio[] {
    const currentChat: number = this.chatService.newMessaggiSignal();
    const userMessageMap: Record<string, UserReduced> = this.userMessageMap();

    const messaggi: Messaggio[] = this.chatService.gruppiChat.messaggi[1];
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
