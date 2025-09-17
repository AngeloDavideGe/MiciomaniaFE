import { environment } from '../../../../../environments/environment';
import { DataHttp } from '../../../api/http.data';
import { UserReduced } from '../interfaces/chat.interface';

export function mapUserMessage(): Record<string, UserReduced> {
  return DataHttp.users().reduce((map, utente) => {
    if (utente) {
      map[utente.id] = {
        nome: utente.nome || '',
        pic: utente.profilePic || environment.defaultPic,
      };
    } else {
      map[utente] = {
        nome: 'Anonimo',
        pic: environment.defaultPic,
      };
    }
    return map;
  }, {} as Record<string, UserReduced>);
}
