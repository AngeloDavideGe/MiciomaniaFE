import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { supabase } from '../../../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ChatGroupService {
  public messaggiCaricatiBool: boolean = false;
  public messages = signal<any[]>([]);
  public chatVisibile = signal<boolean>(true);
  private readonly maxMessages = 10;

  constructor() {
    this.listenForMessages();
  }

  loadMessages(chatId: string): Observable<any[]> {
    return from(
      supabase.client2
        .from('messaggi')
        .select('*')
        .eq('chat_id', chatId)
        .order('id', { ascending: false })
        .limit(this.maxMessages)
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Errore nel caricamento dei messaggi:', error);
          return [];
        }
        const limitedMessages = (data || []).reverse();
        this.messages.set(limitedMessages);
        this.messaggiCaricatiBool = true;
        return limitedMessages;
      })
    );
  }

  sendMessage(
    chatId: string,
    sender: string,
    text: string,
    dateTime: Date
  ): Observable<{ data: any; error: any }> {
    return from(
      supabase.client2.from('messaggi').insert([
        {
          chat_id: chatId,
          sender,
          content: text,
          created_at: dateTime.toISOString(),
        },
      ])
    ).pipe(
      tap(({ error }) => {
        if (error) {
          console.error('Errore nell’invio del messaggio:', error);
        }
      })
    );
  }

  private listenForMessages() {
    supabase.client2
      .channel('messaggi')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messaggi' },
        (payload) => {
          const currentMessages = this.messages();
          currentMessages.push(payload.new);

          if (currentMessages.length > this.maxMessages) {
            this.messages.set(currentMessages.slice(-this.maxMessages));
          } else {
            this.messages.set([...currentMessages]);
          }
        }
      )
      .subscribe(() => {});
  }
}
