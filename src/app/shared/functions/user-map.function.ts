import { AuthService } from '../services/api/auth.service';
import { AppConfigService } from '../../core/api/appConfig.service';
import { UserReduced } from '../../../library/interfaces/chat.interface';

export function mapUserMessage(
  authService: AuthService,
  configService: AppConfigService,
): Record<string, UserReduced> {
  return authService.users().reduce(
    (map, utente) => {
      if (utente) {
        map[utente.id] = {
          nome: utente.nome || '',
          pic: utente.profilePic || configService.config.defaultPicsUrl.user,
        };
      } else {
        map[utente] = {
          nome: 'Anonimo',
          pic: configService.config.defaultPicsUrl.user,
        };
      }
      return map;
    },
    {} as Record<string, UserReduced>,
  );
}
