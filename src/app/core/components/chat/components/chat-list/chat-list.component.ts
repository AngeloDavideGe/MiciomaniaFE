import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Output,
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

    <app-chat-group
      [messages]="messages()"
      [messaggiComp]="messaggiComp"
    ></app-chat-group>
  `,
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  private chatService = inject(ChatGroupService);

  public user: User | null = null;
  public messaggiComp: IMessaggioComponent[] = [];
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );
  public messages: Signal<Messaggio[]> = computed(() => this.computedMessage());

  constructor() {
    effect(() => (this.user = DataHttp.user()));
  }

  @Output() chiudiChat = new EventEmitter<void>();

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

    this.messaggiComp = messaggioComp;

    return messaggi;
  }
}
