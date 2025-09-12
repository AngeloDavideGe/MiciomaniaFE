import { DataHttp } from '../../../api/http.data';
import { Messaggio, UserReduced } from '../interfaces/chat-group.interface';

export function mapMessageId(messages: Messaggio[]): Record<number, Messaggio> {
  return messages.reduce((map, message) => {
    map[message.id] = message;
    return map;
  }, {} as Record<number, Messaggio>);
}

export function mapUserMessage(): Record<string, UserReduced> {
  return DataHttp.users().reduce((map, utente) => {
    if (utente) {
      map[utente.id] = {
        nome: utente.nome || '',
        pic: utente.profilePic || '',
      };
    } else {
      map[utente] = {
        nome: 'Anonimo',
        pic: 'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
      };
    }
    return map;
  }, {} as Record<string, UserReduced>);
}
