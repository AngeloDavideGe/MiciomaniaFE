import { inject, Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AppConfigService } from '../../../api/appConfig.service';
import { Messaggio, MessaggioSend } from '../interfaces/chat-group.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatGroupService {
  private appConfig = inject(AppConfigService);

  public messaggiCaricatiBool: boolean = false;
  public messages = signal<Messaggio[]>([]);
  public chatVisibile = signal<boolean>(true);
  private readonly maxMessages = 10;

  loadMessages(chatId: string): Observable<any> {
    return from(
      this.appConfig.client.c2
        .from('messaggi')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: false })
        .limit(this.maxMessages)
    );
  }

  sendMessage(
    chatId: string,
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

  activateListener(chatId: string): void {
    this.appConfig.client.c2
      .channel('messaggi')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messaggi',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload: { new: Messaggio }) => {
          this.messages.update((current: Messaggio[]) =>
            [...current, payload.new].slice(-this.maxMessages)
          );
        }
      )
      .subscribe();
  }
}
