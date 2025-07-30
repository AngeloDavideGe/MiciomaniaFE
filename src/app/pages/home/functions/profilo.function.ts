import { Ruolo } from '../../auth/enums/users.enum';
import { User } from '../../../shared/interfaces/users.interface';
import { Tweet } from '../interfaces/profilo.interface';
import { Profilo } from '../../../shared/interfaces/http.interface';

export function mapToProfilo(dbResult: any): Profilo {
  const user: User = {
    id: dbResult.utente.id || null,
    credenziali: {
      nome: dbResult.utente.nome || '',
      email: dbResult.utente.email || '',
      password: dbResult.utente.password || '',
      profilePic: dbResult.utente.profilePic || null,
      ruolo: dbResult.utente.ruolo || Ruolo.USER,
    },
    profile: {
      bio: dbResult.utente.bio || null,
      telefono: dbResult.utente.telefono || null,
      compleanno: dbResult.utente.compleanno || null,
      social: dbResult.utente.social || null,
    },
    iscrizione: {
      stato: dbResult.utente.stato || null,
      team: dbResult.utente.team || null,
      provincia: dbResult.utente.provincia || null,
      citta: dbResult.utente.citta || null,
      punteggio: dbResult.utente.punteggio || null,
    },
  };

  const tweets: Tweet[] = (dbResult.pubblicazioni || []).map((pub: any) => ({
    id: pub.id,
    testo: pub.testo,
    dataCreazione: new Date(pub.dataCreazione),
    userId: pub.idUtente,
  }));

  return {
    user,
    tweets,
  };
}
