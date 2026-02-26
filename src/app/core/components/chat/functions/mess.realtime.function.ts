import { environment } from '../../../../../environments/environment';
import { RealtimePayload } from '../../../../shared/interfaces/supabase.interface';
import { DataHttp } from '../../../api/http.data';
import { Messaggio } from '../interfaces/chat.interface';
import { ChatService } from '../services/chat.service';

export function insertMessageRealtime(
  payload: RealtimePayload<any>,
  chatService: ChatService,
): void {
  const chatId: number = payload.new.chat_id;
  const currentMessages: Messaggio[] = [
    ...(DataHttp.gruppiChat.messaggi[chatId] || []),
    payload.new,
  ].slice(-environment.maxElement.message);

  DataHttp.gruppiChat = {
    ...DataHttp.gruppiChat,
    ultimoId: payload.new.id,
    ultimoAggiornamento: new Date(),
    messaggi: {
      ...DataHttp.gruppiChat.messaggi,
      [chatId]: currentMessages,
    },
  };

  if (chatService.currentChat() == payload.new.chat_id) {
    chatService.newMessaggiSignal.set(chatService.cont++);
  }
}

export function updateMessageRealtime(
  payload: RealtimePayload<any>,
  chatService: ChatService,
): void {
  const chatId: number = payload.new.chat_id;
  const msgId: number = payload.new.id;
  let messaggi: Messaggio[] = DataHttp.gruppiChat.messaggi[chatId];

  if (payload.new.content == '') {
    messaggi = messaggi.filter((x: Messaggio) => x.id != msgId);
  } else {
    messaggi = messaggi.map((x: Messaggio) =>
      x.id == msgId ? payload.new : x,
    );
  }

  DataHttp.gruppiChat = {
    ...DataHttp.gruppiChat,
    ultimoAggiornamento: new Date(),
    messaggi: {
      ...DataHttp.gruppiChat.messaggi,
      [chatId]: messaggi,
    },
  };

  if (chatService.currentChat() == payload.new.chat_id) {
    chatService.newMessaggiSignal.set(chatService.cont++);
  }
}
