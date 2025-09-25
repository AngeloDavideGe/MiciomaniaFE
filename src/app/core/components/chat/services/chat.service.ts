import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { uploadImage } from '../../../../shared/functions/upload-pic.function';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { RealtimePayload } from '../../../../shared/interfaces/supabase.interface';
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
  MessaggioSend,
  ReturnEditMessage,
} from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  public cont: number = 1;
  public messaggiCaricatiBool: boolean = false;
  public currentChat = signal<number | null>(null);
  public chatVisibile = signal<boolean>(true);
  public aggiornamentoPic = signal<number>(0);
  public newMessaggiSignal = signal<number>(0);

  constructor() {
    super('DB2');
  }

  loadChatGruppi(): Observable<GruppiChat> {
    const body = {
      last_updated: DataHttp.gruppiChat.ultimoAggiornamento,
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

  updateMessages(id: number, content: string): Observable<ReturnEditMessage> {
    const body = {
      id_mess: id,
      content_new: content,
    };

    return this.postCustom<ReturnEditMessage>('rpc/update_message', body);
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

  uploadProfileImage(file: File, chatId: number): Observable<string> {
    return uploadImage<string>({
      appConfig: this.appConfig,
      client: 'c2',
      file: file,
      id: chatId,
      switchMapCall: (url: string) => {
        const body = {
          chat_id: chatId,
          pic_url: url,
        };

        return this.postCustom<string>('rpc/update_group_pic', body);
      },
    });
  }
}
