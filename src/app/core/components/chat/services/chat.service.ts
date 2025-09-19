import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { BaseService } from '../../../../shared/services/base/base.service';
import { DataHttp } from '../../../api/http.data';
import {
  getRealTimeFilter,
  RealTimeFilter,
} from '../../../functions/supabase.function';
import {
  insertMessageRealtime,
  updateMessageRealtime,
} from '../functions/mess.realtime.function';
import {
  GruppiChat,
  Messaggio,
  MessaggioSend,
} from '../interfaces/chat.interface';
import { RealtimePayload } from '../../../../shared/interfaces/supabase.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  public cont: number = 1;
  public currentChat = signal<number | null>(null);
  public messaggiCaricatiBool: boolean = false;
  public chatVisibile = signal<boolean>(true);
  public newMessaggiSignal = signal<number>(0);

  constructor() {
    super('DB2');
  }

  loadChatGruppi(): Observable<GruppiChat> {
    const body = {
      max_message: environment.maxMessagesForchat,
      last_message_id: DataHttp.gruppiChat.ultimoId,
    };

    return this.postCustom<GruppiChat>('rpc/get_all_chats', body);
  }

  sendMessage(
    chatId: number,
    sender: string,
    text: string,
    risposta: number | null,
    separator: boolean
  ): Observable<any> {
    const message: MessaggioSend[] = [
      {
        chat_id: chatId,
        sender,
        content: text,
        created_at: formatDataCustom(new Date()),
        response: risposta,
        separator: separator,
      },
    ];

    return from(this.appConfig.client.c2.from('messaggi').insert(message));
  }

  updateMessages(id: number, content: string): Observable<any> {
    return from(
      this.appConfig.client.c2
        .from('messaggi')
        .update({ content: content })
        .eq('id', id)
    );
  }

  activateListener(): void {
    const filter: RealTimeFilter = getRealTimeFilter('public', 'messaggi');

    this.appConfig.client.c2
      .channel('messaggi')
      .on('postgres_changes', filter, (payload: RealtimePayload<any>) => {
        switch (payload.eventType) {
          case 'INSERT': {
            insertMessageRealtime(payload, this);
            break;
          }
          case 'UPDATE': {
            updateMessageRealtime(payload, this);
            break;
          }
        }
      })
      .subscribe();
  }
}
