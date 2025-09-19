import { take } from 'rxjs/operators';
import { DataHttp } from '../../../api/http.data';
import { GruppiChat, Gruppo, Messaggio } from '../interfaces/chat.interface';
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
        params.chatService.messaggiCaricatiBool = true;
        params.chatService.activateListener();
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
        params.separator
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
  const messaggi: Record<number, Messaggio[]> = DataHttp.gruppiChat.messaggi;

  gruppi.listaGruppi.forEach((x: Gruppo) => {
    if (messaggi[x.id]) {
      messaggi[x.id]
        .concat(gruppi.messaggi[x.id])
        .slice(-environment.maxMessagesForchat);
    } else {
      messaggi[x.id] = gruppi.messaggi[x.id];
    }
  });

  DataHttp.gruppiChat = {
    listaGruppi: gruppi.listaGruppi,
    ultimoId: gruppi.ultimoId,
    messaggi: messaggi,
  };
}
