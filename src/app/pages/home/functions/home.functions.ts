import { Router } from '@angular/router';
import { iCard } from '../../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../../library/interfaces/pagination.interface';
import { dateFormat } from '../../../../library/pipes/date-format.pipe';
import {
  CronUtenti,
  User,
  UserParams,
} from '../../../shared/interfaces/users.interface';
import { UserReduced } from '../../../core/components/chat/interfaces/chat.interface';

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

export function converUserParams(user: User): UserParams {
  return {
    id: user.id,
    nome: user.credenziali.nome,
    profilePic: user.credenziali.profilePic,
    ruolo: user.credenziali.ruolo,
  } as UserParams;
}

export function getCardsHome(router: Router, canzoneFunc: Function): iCard[] {
  return [
    {
      urlPic:
        'https://thesoundcheck.it/wp-content/uploads/2022/11/kono-manga-ga-sugoi-2021-migliori-riviste-manga-weekly-shonen-jump-secondo-v3-488235.jpg',
      azione: () => router.navigate(['/manga']),
      titolo: 'Manga Miciomania',
      bottone: '📚 Manga',
      descrizione:
        'Esplora il mondo dei manga di Miciomania (Parodie e non), così da capire come facciamo piangere le donne.',
    },
    {
      urlPic:
        'https://www.vice.com/wp-content/uploads/sites/2/2019/12/1577443774135-thumb_canzoni_internazionali.jpeg?w=1024',
      azione: () => canzoneFunc(),
      titolo: 'Musica Miciomania',
      bottone: '🎶 Ascolta',
      descrizione:
        'Immergiti nel mondo musicale di Miciomania: brani intensi che hanno toccato il cuore (e fatto versare qualche lacrima) a molte ascoltatrici.',
    },
    {
      urlPic:
        'https://www.flashgames.it/giochi/abilita/my.virtual.pet.shop/my.virtual.pet.shop.jpg',
      azione: () => router.navigate(['/games']),
      titolo: 'Gioca con i sentimenti',
      bottone: '🎮 Gioca',
      descrizione:
        'Prova i vari minigiochi Miciomani, non solo quelli con cui tratti male una donna conoscente dei membri di Miciomania.',
    },
  ];
}

export function pagineHome(): RaggioPage[] {
  return [
    // {
    //   width: 1376,
    //   raggio: 4,
    // },
    {
      width: 1200,
      raggio: 3,
    },
    {
      width: 768,
      raggio: 2,
    },
    {
      width: 1,
      raggio: 1,
    },
  ];
}

export function getNotificheTemplate(
  value: CronUtenti,
  userReduced: Record<string, UserReduced>,
  defaultPic: string,
): string {
  return `
      <div class="notification">
        <div class="avatar">
          <img src="${userReduced[value.idUtente]?.pic || defaultPic}" alt="${value.idUtente}">
        </div>
  
        <div class="content">
          <div class="message">
            <strong>${value.idUtente}</strong> ${value.azione}
          </div>
  
          <small class="time">
            ${dateFormat(value.created_at, 'dd mmmm yyyy hh:mm')}
          </small>
        </div>
      </div>
    `;
}
