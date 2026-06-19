import { Router } from '@angular/router';
import {
  MenuElements,
  ToggleProps,
} from '../../../../library/interfaces/toggle.interface';

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
