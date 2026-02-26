import { take } from 'rxjs/operators';
import { DataHttp } from '../../../api/http.data';
import {
  GruppiChat,
  Gruppo,
  Messaggio,
  MessaggioUpdate,
} from '../interfaces/chat.interface';
import { ChatService } from '../services/chat.service';
import { environment } from '../../../../../environments/environment';

export function loadMessages(params: {
  chatService: ChatService;
  nextCall: Function;
}): void {
  params.chatService
    .loadChatGruppi()
    .pipe(take(1))
    .subscribe({
      next: (gruppi: GruppiChat) => {
        addNewMessage(gruppi);
        params.chatService.activateListener();
        params.chatService.messaggiCaricatiBool = true;
        params.nextCall();
      },
      error: (err: any) => console.error('errore load message', err),
    });
}

export function sendMessage(params: {
  chatService: ChatService;
  ifCond: boolean;
  nextCall: Function;
  newMessage: string;
  risposta: number | null;
  idChat: number;
  separator: boolean;
}): void {
  if (params.ifCond) {
    params.chatService
      .sendMessage(
        params.idChat,
        DataHttp.user()!.id,
        params.newMessage,
        params.risposta,
        params.separator,
      )
      .pipe(take(1))
      .subscribe({
        next: () => params.nextCall(),
      });
  }
}

export function updateMessage(params: {
  chatService: ChatService;
  id: number;
  content: string;
}): void {
  params.chatService
    .updateMessages(params.id, params.content)
    .pipe(take(1))
    .subscribe();
}

function addNewMessage(gruppi: GruppiChat): void {
  const messaggi: Record<number, Messaggio[]> =
    DataHttp.gruppiChat.messaggi || {};
  const cambiati: Record<number, MessaggioUpdate[]> =
    gruppi.messaggiCambiati || {};
  const cambiatiMap: Record<number, Map<number, MessaggioUpdate>> = {};

  Object.keys(cambiati).forEach((chatId) => {
    const idNum = Number(chatId);
    cambiatiMap[idNum] = new Map();

    cambiati[idNum].forEach((update: MessaggioUpdate) => {
      cambiatiMap[idNum].set(update.id, update);
    });
  });

  gruppi.listaGruppi.forEach((x: Gruppo) => {
    const chatId: number = x.id;

    if (messaggi[chatId]) {
      if (cambiatiMap[chatId]) {
        const existingMessages: Messaggio[] = messaggi[chatId];

        for (let i = existingMessages.length - 1; i >= 0; i--) {
          const update: MessaggioUpdate | undefined = cambiatiMap[chatId].get(
            existingMessages[i].id,
          );

          if (update && update.contentNew != '') {
            existingMessages[i].content = update.contentNew;
            cambiatiMap[chatId].delete(existingMessages[i].id);
          }
        }
      }

      const newMessages: Messaggio[] = gruppi.messaggi[chatId] || [];
      const maxMessages: number = environment.maxElement.message;
      const allMessages: Messaggio[] = messaggi[chatId].concat(newMessages);

      if (allMessages.length > maxMessages) {
        messaggi[chatId] = allMessages.slice(-maxMessages);
      } else {
        messaggi[chatId] = allMessages;
      }
    } else {
      messaggi[chatId] = gruppi.messaggi[chatId] || [];
    }
  });

  DataHttp.gruppiChat = {
    listaGruppi: gruppi.listaGruppi,
    messaggi: messaggi,
    messaggiCambiati: cambiati,
    ultimoAggiornamento: new Date(),
    ultimoId: gruppi.ultimoId,
  };
}
