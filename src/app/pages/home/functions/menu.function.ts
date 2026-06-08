import { Router } from '@angular/router';
import { HomeLang } from '../languages/interfaces/home-lang.interface';
import { DataHttp } from '../../../core/api/http.data';
import { Lingua } from '../../../shared/interfaces/http.interface';
import {
  MenuElements,
  ToggleProps,
} from '../../../../library/interfaces/toggle.interface';

export function getToggleMenus(
  router: Router,
  homeLang: HomeLang,
  userId: any,
  logout: () => void,
  cursore: () => void,
): ToggleProps[] {
  return [
    {
      titolo: homeLang.profili,
      icona: 'bi bi-person-fill',
      menuElementi: getProfiliElements(router, homeLang, userId, logout),
    },
    {
      titolo: homeLang.impostazioni,
      icona: 'bi bi-gear-fill',
      menuElementi: getImpostazioniElements(router, homeLang, userId, cursore),
    },
    {
      titolo: homeLang.lingua,
      icona: 'bi bi-translate',
      menuElementi: getLinguaElements(),
    },
  ];
}

function getImpostazioniElements(
  router: Router,
  homeLang: HomeLang,
  userId: any,
  cursore: () => void,
): MenuElements[] {
  return [
    {
      azione: () => router.navigate(['/home/interazioni']),
      testo: homeLang.interazioni,
      icona: 'bi bi-chat-square-quote-fill',
      condition: true,
    },
    {
      azione: () => router.navigate(['/auth/iscrizione']),
      testo: homeLang.iscrizioneTeam,
      icona: 'bi bi-person-plus',
      condition: !!userId,
    },
    {
      azione: () => router.navigate(['/home/squadre']),
      testo: homeLang.squadre,
      icona: 'bi bi-people-fill',
      condition: true,
    },
    {
      azione: () => cursore(),
      testo: homeLang.cursore,
      icona: 'bi bi-cursor',
      condition: true,
    },
  ];
}

function getProfiliElements(
  router: Router,
  homeLang: HomeLang,
  userId: any,
  logout: () => void,
) {
  return [
    {
      azione: () => router.navigate(['/posts/profilo/' + userId]),
      testo: homeLang.mioProfilo,
      icona: 'bi bi-person-circle',
      condition: !!userId,
    },
    {
      azione: () => router.navigate(['/posts/ultimi-post']),
      testo: homeLang.visualizzaPost,
      icona: 'bi bi-grid-3x3-gap',
      condition: true,
    },
    {
      azione: () => router.navigate(['/home/admin']),
      testo: homeLang.contattaAdmin,
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

function getLinguaElements(): MenuElements[] {
  return [
    {
      azione: () => DataHttp.lingua.set(Lingua.it),
      testo: 'it',
      icona: 'bi bi-globe',
      condition: true,
    },
    {
      azione: () => DataHttp.lingua.set(Lingua.en),
      testo: 'en',
      icona: 'bi bi-globe',
      condition: true,
    },
  ];
}
