import { ChatGroupService } from '../services/chat-group.service';
import { map, take } from 'rxjs/operators';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { DataHttp } from '../../../api/http.data';
import { Messaggio } from '../interfaces/chat-group.interface';

export function loadMessages(params: {
  chatService: ChatGroupService;
  ifCall: Function;
  nextCall: Function;
  chatId: number;
}): void {
  if (!params.chatService.messaggiCaricatiBool) {
    params.ifCall();
    params.chatService
      .loadMessages(params.chatId)
      .pipe(
        take(1),
        map((response: { data: Messaggio[] }) =>
          (response.data || []).reverse()
        )
      )
      .subscribe({
        next: (messaggi: Messaggio[]) => {
          params.chatService.messages.set(messaggi);
          params.chatService.messaggiCaricatiBool = true;
          params.chatService.activateListener();
          params.nextCall();
        },
        error: (err: any) => console.error('errore load message', err),
      });
  }
}

export function sendMessage(params: {
  chatService: ChatGroupService;
  ifCond: boolean;
  nextCall: Function;
  newMessage: string;
  risposta: number | null;
}): void {
  if (params.ifCond) {
    params.chatService
      .sendMessage(
        1,
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
