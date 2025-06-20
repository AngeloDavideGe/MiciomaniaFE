import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatGroupService {
  private messagesSubject = new BehaviorSubject<any[]>([]);
  public messaggiCaricatiBool: boolean = false;
  public messages$ = this.messagesSubject.asObservable().pipe(shareReplay(1));

  constructor() {
    this.listenForMessages();
  }

  loadMessages(chatId: string): Observable<any[]> {
    return from(
      environment.supabase
        .from('messaggi')
        .select('*')
        .eq('chat_id', chatId)
        .order('id', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Errore nel caricamento dei messaggi:', error);
          return [];
        }
        this.messagesSubject.next(data || []);
        this.messaggiCaricatiBool = true;
        return data || [];
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
      environment.supabase.from('messaggi').insert([
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
    environment.supabase
      .channel('messaggi')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messaggi' },
        (payload) => {
          const currentMessages = this.messagesSubject.value;
          this.messagesSubject.next([...currentMessages, payload.new]);
        }
      )
      .subscribe();
  }
}
