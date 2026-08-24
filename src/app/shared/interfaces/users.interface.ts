import { Ruolo } from '../enums/users.enum';

export interface UserToken {
  user: User | null;
  token: string;
}

export interface User {
  id: string;
  admin: Admin;
  credenziali: Credenziali;
  profile: Profile;
  iscrizione: Iscrizione;
}

export interface Credenziali {
  nome: string;
  email: string;
  password: string;
  profilePic: string | null;
}

export interface Iscrizione {
  squadra: string | null;
  provincia: string | null;
  punteggio: number | null;
}

export interface Profile {
  bio: string | null;
  compleanno: Date | string | null;
  social: Record<string, string> | null;
}

export interface Admin {
  ruolo: Ruolo;
  permessi: string[];
}

export interface UserParams {
  id: string;
  nome: string;
  profilePic: string | null;
  ruolo: Ruolo;
}

export interface CronUtenti {
  id: string;
  idUtente: string;
  azione: string;
  created_at: Date;
  sezione: string;
}
