import { User } from '../../../shared/interfaces/users.interface';

export function getConfirmParams(user: User): {
  path: string;
  titolo: string;
  messaggio: string;
} {
  if (user.id) {
    return {
      path: '/games',
      titolo: 'Punteggio Insufficiente',
      messaggio: 'Vuoi provare i minigiochi per livellare?',
    };
  } else {
    return {
      path: '/auth/login',
      titolo: 'Non hai effettuato nessun accesso',
      messaggio: 'Vuoi accedere per ascoltare la musica inedita?',
    };
  }
}
