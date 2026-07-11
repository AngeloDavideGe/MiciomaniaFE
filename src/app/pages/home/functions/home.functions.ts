import { Router } from '@angular/router';
import { iCard } from '../../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../../library/interfaces/pagination.interface';
import {
  CronUtenti,
  User,
  UserParams,
} from '../../../shared/interfaces/users.interface';
import {
  MenuElements,
  ToggleProps,
} from '../../../../library/interfaces/toggle.interface';
import { dateFormat } from '../../../../library/pipes/date-format.pipe';
import { UserReduced } from '../../../../library/interfaces/chat.interface';

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

export function getToggleNotifiche(
  menuElementi: MenuElements[],
): ToggleProps[] {
  return [
    {
      titolo: '',
      menuElementi: menuElementi,
    },
  ];
}

export function getToggleMenus(
  router: Router,
  userId: any,
  logout: () => void,
  cursore: () => void,
): ToggleProps[] {
  return [
    {
      titolo: 'Profili',
      icona: 'bi bi-person-fill',
      menuElementi: getProfiliElements(router, userId, logout),
    },
    {
      titolo: 'Impostazioni',
      icona: 'bi bi-gear-fill',
      menuElementi: getImpostazioniElements(router, userId, cursore),
    },
  ];
}

function getImpostazioniElements(
  router: Router,
  userId: any,
  cursore: () => void,
): MenuElements[] {
  return [
    {
      azione: () => router.navigate(['/auth/iscrizione']),
      testo: 'Aggiorna Profilo',
      icona: 'bi bi-person-plus',
      condition: !!userId,
    },
    {
      azione: () => router.navigate(['/home/interazioni']),
      testo: 'Interazioni',
      icona: 'bi bi-chat-square-quote-fill',
      condition: true,
    },
    {
      azione: () => router.navigate(['/home/squadre']),
      testo: 'Squadre',
      icona: 'bi bi-people-fill',
      condition: true,
    },
    {
      azione: () => cursore(),
      testo: 'Cursore',
      icona: 'bi bi-cursor',
      condition: true,
    },
  ];
}

function getProfiliElements(router: Router, userId: any, logout: () => void) {
  return [
    {
      azione: () => router.navigate(['/posts/profilo/' + userId]),
      testo: 'Profilo Personale',
      icona: 'bi bi-person-circle',
      condition: !!userId,
    },
    {
      azione: () => router.navigate(['/posts/ultimi-post']),
      testo: 'Visualizza Post',
      icona: 'bi bi-grid-3x3-gap',
      condition: true,
    },
    {
      azione: () => router.navigate(['/home/admin']),
      testo: 'Contatta Admin',
      icona: 'bi bi-envelope',
      condition: true,
    },
    {
      azione: () => logout(),
      testo: 'Logout',
      icona: 'bi bi-box-arrow-right',
      condition: !!userId,
    },
    {
      azione: () => router.navigate(['/auth/login']),
      testo: 'Login',
      icona: 'bi bi-box-arrow-in-right',
      condition: !userId,
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

export function getProfiliTemplate(user: User, currentId: string): string {
  return `
    <div class="profile-item">
      <div class="profile-avatar">
        ${
          user.credenziali.profilePic
            ? `<img src="${user.credenziali.profilePic}" alt="Profile Picture" class="rounded-circle" />`
            : `<div class="avatar-placeholder"><span>${user.id.slice(0, 2).toUpperCase()}</span></div>`
        }
      </div>

      <div class="profile-info">
        <div class="profile-username">${user.id}</div>
        <div class="profile-name">${user.credenziali.nome}</div>
      </div>

      <div class="profile-actions">
        ${
          user.id === currentId
            ? `<div class="profile-check"><i class="bi bi-check-circle-fill"></i></div>`
            : ''
        }
      </div>
    </div>
  `;
}
