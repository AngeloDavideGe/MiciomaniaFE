import { ChatGroupService } from '../services/chat-group.service';
import { map, take } from 'rxjs/operators';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { DataHttp } from '../../../api/http.data';
import { Messaggio } from '../interfaces/chat-group.interface';

export function loadMessages(params: {
  chatService: ChatGroupService;
  ifCall: Function;
  nextCall: Function;
}): void {
  if (!params.chatService.messaggiCaricatiBool) {
    params.ifCall();
    params.chatService
      .loadMessages('550e8400-e29b-41d4-a716-446655440000')
      .pipe(
        take(1),
        map((response: { data: Messaggio[] }) => response.data.reverse())
      )
      .subscribe({
        next: (messaggi: Messaggio[]) => {
          params.chatService.messages.set(messaggi);
          params.chatService.messaggiCaricatiBool = true;
          params.nextCall();
        },
        error: (err) => console.error('errore load message', err),
      });
  }
}

export function sendMessage(params: {
  chatService: ChatGroupService;
  ifCond: boolean;
  nextCall: Function;
  newMessage: string;
}): void {
  if (params.ifCond) {
    params.chatService
      .sendMessage(
        '550e8400-e29b-41d4-a716-446655440000',
        DataHttp.user()!.id,
        params.newMessage,
        formatDataCustom(new Date())
      )
      .pipe(take(1))
      .subscribe({
        next: () => params.nextCall(),
      });
  }
}
