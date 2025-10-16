import { Ruolo } from '../../../shared/enums/users.enum';
import { User } from '../../../shared/interfaces/users.interface';
import { Tweet } from '../../posts/components/shared/post.interface';
import { Profilo } from '../../../shared/interfaces/http.interface';

export function mapToProfilo(dbResult: any): Profilo {
  const user: User = {
    id: dbResult.user.id || null,
    credenziali: {
      nome: dbResult.user.nome || '',
      email: dbResult.user.email || '',
      password: dbResult.user.password || '',
      profilePic: dbResult.user.profilePic || null,
      ruolo: dbResult.user.ruolo || Ruolo.USER,
    },
    profile: {
      bio: dbResult.user.bio || null,
      telefono: dbResult.user.telefono || null,
      compleanno: dbResult.user.compleanno || null,
      social: dbResult.user.social || null,
    },
    iscrizione: {
      stato: dbResult.user.stato || null,
      squadra: dbResult.user.squadra || null,
      provincia: dbResult.user.provincia || null,
      punteggio: dbResult.user.punteggio || null,
    },
  };

  const tweets: Tweet[] = (dbResult.tweets || []).map((pub: any) => ({
    id: pub.id,
    dataCreazione: new Date(pub.dataCreazione),
    testo: pub.testo,
    userId: pub.idUtente,
    immaginePost: pub.immaginePost,
  }));

  return {
    user,
    tweets,
  };
}
