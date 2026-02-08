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
  squadra: string | null;
  provincia: string | null;
  punteggio: number | null;
}

export interface Profile {
  bio: string | null;
  telefono: string | null;
  compleanno: Date | string | null;
  social: Record<string, string> | null;
}

export interface UserParams {
  id: string;
  nome: string;
  profilePic: string | null;
  ruolo: Ruolo;
}

export interface UserDb {
  id: string;
  nome: string;
  email: string;
  password: string;
  profilePic: string | null;
  ruolo: Ruolo;
  stato: StatoPersona | null;
  squadra: string | null;
  provincia: string | null;
  punteggio: number | null;
  bio: string | null;
  telefono: string | null;
  compleanno: Date | string | null;
  social: Record<string, string> | null;
}
