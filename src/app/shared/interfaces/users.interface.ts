import { Ruolo, StatoPersona } from '../enums/users.enum';

export interface User {
  id: string;
  credenziali: Credenziali;
  profile: Profile;
  iscrizione: Iscrizione;
}

export interface Credenziali {
  nome: string;
  email: string;
  password: string;
  profilePic: string | null;
  ruolo: Ruolo;
}

export interface Iscrizione {
  stato: StatoPersona | null;
  team: string | null;
  provincia: string | null;
  citta: string | null;
  punteggio: number | null;
}

export interface Profile {
  bio: string | null;
  telefono: string | null;
  compleanno: Date | string | null;
  social: JSON | null;
}

export interface UserParams {
  id: string;
  nome: string;
  profilePic: string | null;
  ruolo: Ruolo;
}

export interface PostUserForDb {
  nome_input: string;
  username_input: string;
  email_input: string;
  password_input: string;
}
