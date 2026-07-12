import { Messaggio } from '../../../../../library/interfaces/chat.interface';
import { RealtimePayload } from '../../../../shared/interfaces/supabase.interface';
import { AppConfigService } from '../../../api/appConfig.service';
import { DataHttp } from '../../../api/http.data';

export function insertMessageRealtime(
  payload: RealtimePayload<any>,
  configService: AppConfigService,
): void {
  const chatId: number = payload.new.chat_id;
  const currentMessages: Messaggio[] = [
    ...(DataHttp.gruppiChat.messaggi[chatId] || []),
    payload.new,
  ].slice(-configService.config.maxElement.message);

  DataHttp.gruppiChat = {
    ...DataHttp.gruppiChat,
    ultimoId: payload.new.id,
    ultimoAggiornamento: new Date(),
    messaggi: {
      ...DataHttp.gruppiChat.messaggi,
      [chatId]: currentMessages,
    },
  };
}

export function updateMessageRealtime(payload: RealtimePayload<any>): void {
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
}
