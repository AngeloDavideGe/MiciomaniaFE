import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BaseService } from '../../../../shared/services/base/base.service';
import {
  GruppiChat,
  Messaggio,
  MessaggioSend,
} from '../interfaces/chat.interface';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { DataHttp } from '../../../api/http.data';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  private readonly maxMessages = 10;
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
      max_message: this.maxMessages,
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

  activateListener(): void {
    this.appConfig.client.c2
      .channel('messaggi')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messaggi',
        },
        (payload: { new: Messaggio }) => {
          const chatId: number = payload.new.chat_id;
          const current: Messaggio[] =
            DataHttp.gruppiChat.messaggi[chatId] || [];

          DataHttp.gruppiChat.messaggi[chatId] = [
            ...current,
            payload.new,
          ].slice(-this.maxMessages);
          DataHttp.gruppiChat.ultimoId = payload.new.id;

          if (this.currentChat() == chatId) {
            this.newMessaggiSignal.set(this.cont++);
          }
        }
      )
      .subscribe();
  }
}
