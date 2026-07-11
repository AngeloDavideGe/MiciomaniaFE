import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ChatIndyComponent } from '../../../../library/components/chat/chat-indy.component';
import {
  GruppiChat,
  Gruppo,
  LastMess,
  Messaggio,
} from '../../../../library/interfaces/chat.interface';
import { DataHttp } from '../../api/http.data';
import {
  addNewMessage,
  getMessaggioBenvenuto,
} from './functions/messaggi.function';
import { handlerFunc } from '../../../../library/functions/handler.function';
import { ChatService } from './services/chat.service';
import { AppConfigService } from '../../api/appConfig.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatIndyComponent],
  template: `
    <app-chat-indy
      [bottomValue]="bottomValue"
      [allGruppi]="allGruppi()"
      [lastMessaggi]="allGruppiRecord()"
    ></app-chat-indy>
  `,
})
export class ChatComponent implements OnInit {
  private chatService = inject(ChatService);
  private configService = inject(AppConfigService);

  public allGruppiRecord = signal<Record<number, LastMess>>({});
  public allGruppi = signal<Gruppo[]>([]);

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
}
