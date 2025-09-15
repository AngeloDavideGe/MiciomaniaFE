import { take } from 'rxjs/operators';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { DataHttp } from '../../../api/http.data';
import { GruppiChat } from '../interfaces/chat-group.interface';
import { ChatService } from '../services/chat.service';

export function loadMessages(params: {
  chatService: ChatService;
  ifCall: Function;
  nextCall: Function;
  chatId: number;
}): void {
  if (!params.chatService.messaggiCaricatiBool) {
    params.ifCall();
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
}

export function sendMessage(params: {
  chatService: ChatService;
  ifCond: boolean;
  nextCall: Function;
  newMessage: string;
  risposta: number | null;
  idChat: number;
}): void {
  if (params.ifCond) {
    params.chatService
      .sendMessage(
        params.idChat,
        DataHttp.user()!.id,
        params.newMessage,
        formatDataCustom(new Date()),
        params.risposta
      )
      .pipe(take(1))
      .subscribe({
        next: () => params.nextCall(),
      });
  }
}
