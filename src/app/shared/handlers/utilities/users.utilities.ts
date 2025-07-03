import { User, UserParams } from '../../interfaces/users.interface';

export class UsersUtilities {
  public mapUserMessage(users: UserParams[]): {
    [id: string]: { nome: string; pic: string };
  } {
    return users.reduce((map, utente) => {
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
    }, {} as { [id: string]: { nome: string; pic: string } });
  }

  public converUserParams(user: User): UserParams {
    return {
      id: user.id,
      nome: user.credenziali.nome,
      profilePic: user.credenziali.profilePic,
      ruolo: user.credenziali.ruolo,
    } as UserParams;
  }
}
