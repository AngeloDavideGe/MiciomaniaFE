import { take } from 'rxjs/operators';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { DataHttp } from '../../../api/http.data';
import { GruppiChat } from '../interfaces/chat.interface';
import { ChatService } from '../services/chat.service';

export function loadMessages(params: {
  chatService: ChatService;
  nextCall: Function;
}): void {
  params.chatService
    .loadChatGruppi()
    .pipe(take(1))
    .subscribe({
      next: (gruppi: GruppiChat) => {
        params.chatService.gruppiChat = gruppi;
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
        formatDataCustom(new Date()),
        params.risposta,
        params.separator
      )
      .pipe(take(1))
      .subscribe({
        next: () => params.nextCall(),
      });
  }
}
