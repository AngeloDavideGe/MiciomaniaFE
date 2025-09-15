import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BaseService } from '../../../../shared/services/base/base.service';
import {
  GruppiChat,
  Messaggio,
  MessaggioSend,
} from '../interfaces/chat-group.interface';

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
  public gruppiChat: GruppiChat = {
    listaGruppi: [],
    messaggi: {},
  };

  constructor() {
    super('DB2');
  }

  loadChatGruppi(): Observable<GruppiChat> {
    return this.postCustom<GruppiChat>('rpc/get_all_chats', {});
  }

  sendMessage(
    chatId: number,
    sender: string,
    text: string,
    dateTime: Date,
    risposta: number | null
  ): Observable<any> {
    const message: MessaggioSend[] = [
      {
        chat_id: chatId,
        sender,
        content: text,
        created_at: dateTime.toISOString(),
        response: risposta,
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
          const current: Messaggio[] = this.gruppiChat.messaggi[chatId];
          this.gruppiChat.messaggi[chatId] = [...current, payload.new].slice(
            -this.maxMessages
          );
          if (this.currentChat() == chatId) {
            this.newMessaggiSignal.set(this.cont++);
          }
        }
      )
      .subscribe();
  }
}
