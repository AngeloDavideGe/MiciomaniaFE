import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ChatIndyComponent } from '../../../../library/components/chat/chat-indy.component';
import {
  GruppiChat,
  Gruppo,
  LastMess,
  Messaggio,
  MessaggioSend,
  UserReduced,
} from '../../../../library/interfaces/chat.interface';
import { DataHttp } from '../../api/http.data';
import {
  addNewMessage,
  getMessaggioBenvenuto,
} from './functions/messaggi.function';
import { handlerFunc } from '../../../../library/functions/handler.function';
import { ChatService } from './services/chat.service';
import { AppConfigService } from '../../api/appConfig.service';
import { mapUserMessage } from '../../../shared/functions/user-map.function';
import { AuthService } from '../../../shared/services/api/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatIndyComponent],
  template: `
    <app-chat-indy
      [bottomValue]="bottomValue"
      [allGruppi]="allGruppi()"
      [messaggi]="currentMessaggi()"
      [userId]="userId()"
      [lastMessaggi]="allGruppiRecord()"
      [recordIdPic]="userMessageMap()"
      (currentChatChange)="changeChat($event)"
      (inviaMessaggio)="sendMessage($event)"
      (modificaMessaggio)="updateMessage($event.id, $event.content)"
      (eliminaMessaggio)="deleteMessage($event)"
    ></app-chat-indy>
  `,
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);
  private configService = inject(AppConfigService);
  private authService = inject(AuthService);

  public allGruppiRecord = signal<Record<number, LastMess>>({});
  public currentMessaggi = signal<Messaggio[]>([]);
  public allGruppi = signal<Gruppo[]>([]);
  public userId = computed<string>(() => DataHttp.user()?.id || '');

  public userMessageMap = computed<Record<string, UserReduced>>(() => {
    let userRecord: Record<string, UserReduced> = {};

    if (this.authService.users().length > 0) {
      userRecord = mapUserMessage(this.authService, this.configService);
      userRecord[this.userId()] = {
        nome: DataHttp.user()?.credenziali.nome || '',
        pic:
          DataHttp.user()?.credenziali.profilePic ||
          this.configService.config.defaultPicsUrl.user,
      };
    }

    return userRecord;
  });

  @Input() bottomValue!: string;

  ngOnInit(): void {
    handlerFunc<GruppiChat>({
      callHttp: () => this.chatService.loadChatGruppi(),
      nextCall: (gruppi: GruppiChat) => {
        addNewMessage(gruppi, this.configService);
        this.chatService.activateListener();
        this.loadComplete();
      },
    });
  }

  public loadComplete(): void {
    const gruppi: GruppiChat = DataHttp.gruppiChat;

    this.allGruppi.set(
      gruppi.listaGruppi
        .map((gruppo: Gruppo) => {
          const messaggi: Messaggio[] =
            gruppi.messaggi[gruppo.id] && gruppi.messaggi[gruppo.id].length > 0
              ? gruppi.messaggi[gruppo.id]
              : [getMessaggioBenvenuto()];

          const lastMsg: Messaggio = messaggi[messaggi.length - 1] || {};
          const orario = new Date(lastMsg.created_at || new Date());
          this.allGruppiRecord.set({
            ...this.allGruppiRecord(),
            [gruppo.id]: {
              content: lastMsg.content,
              orario: orario,
              chat: gruppo.nome,
            },
          });

          return gruppo;
        })
        .sort((a: Gruppo, b: Gruppo) => {
          const mesA: Date = this.allGruppiRecord()[a.id].orario;
          const mesB: Date = this.allGruppiRecord()[b.id].orario;

          return mesA && mesB ? mesB.getTime() - mesA.getTime() : 0;
        }),
    );
  }

  public changeChat(gruppo: Gruppo | null): void {
    if (gruppo) {
      this.currentMessaggi.set(DataHttp.gruppiChat.messaggi[gruppo.id] || []);
    } else {
      this.currentMessaggi.set([]);
    }
  }

  public sendMessage(messaggio: MessaggioSend): void {
    handlerFunc<any>({
      callHttp: () => this.chatService.sendMessage(messaggio),
    });
  }

  public updateMessage(id: number, content: string): void {
    handlerFunc<any>({
      callHttp: () => this.chatService.updateMessages(id, content),
    });
  }

  public deleteMessage(id: number): void {
    handlerFunc<any>({
      callHttp: () => this.chatService.updateMessages(id, ''),
    });
  }
}
