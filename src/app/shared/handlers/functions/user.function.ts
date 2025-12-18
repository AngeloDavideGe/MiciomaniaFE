import { Ruolo } from '../../enums/users.enum';
import {
  Credenziali,
  Iscrizione,
  Profile,
  User,
  UserDb,
} from '../../interfaces/users.interface';

export function mapUserByDb(db: any): User {
  return {
    id: db.id,
    credenziali: {
      nome: db.nome || '',
      email: db.email || '',
      password: db.password || '',
      profilePic: db.profilePic || null,
      ruolo: db.ruolo || Ruolo.USER,
    },
    profile: {
      bio: db.bio || null,
      telefono: db.telefono || null,
      compleanno: db.compleanno ? new Date(db.compleanno) : null,
      social: db.social || null,
    },
    iscrizione: {
      stato: db.stato || null,
      squadra: db.squadra || null,
      provincia: db.provincia || null,
      punteggio: db.punteggio || null,
    },
  };
}

export function mapUserToDb(user: User): UserDb {
  return {
    id: user.id,
    nome: user.credenziali.nome,
    email: user.credenziali.email,
    password: user.credenziali.password,
    profilePic: user.credenziali.profilePic,
    ruolo: user.credenziali.ruolo,
    bio: user.profile?.bio,
    telefono: user.profile?.telefono,
    compleanno: user.profile?.compleanno
      ? user.profile.compleanno instanceof Date
        ? user.profile.compleanno.toISOString()
        : user.profile.compleanno
      : null,
    social: user.profile?.social || null,
    stato: user.iscrizione.stato,
    squadra: user.iscrizione.squadra,
    provincia: user.iscrizione.provincia,
    punteggio: user.iscrizione.punteggio,
  };
}

export function getVoidUser(): User {
  return {
    credenziali: {} as Credenziali,
    profile: {} as Profile,
    iscrizione: {} as Iscrizione,
  } as User;
}
