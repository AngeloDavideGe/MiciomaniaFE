import { User, UserParams } from '../../interfaces/users.interface';

export function converUserParams(user: User): UserParams {
  return {
    id: user.id,
    nome: user.credenziali.nome,
    profilePic: user.credenziali.profilePic,
    ruolo: user.credenziali.ruolo,
  } as UserParams;
}
