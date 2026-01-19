import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { UserReduced } from '../interfaces/chat.interface';

export function mapUserMessage(
  authService: AuthService,
): Record<string, UserReduced> {
  return authService.users().reduce(
    (map, utente) => {
      if (utente) {
        map[utente.id] = {
          nome: utente.nome || '',
          pic: utente.profilePic || environment.defaultPicsUrl.user,
        };
      } else {
        map[utente] = {
          nome: 'Anonimo',
          pic: environment.defaultPicsUrl.user,
        };
      }
      return map;
    },
    {} as Record<string, UserReduced>,
  );
}
