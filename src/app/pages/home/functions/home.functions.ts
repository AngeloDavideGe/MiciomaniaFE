import { iCard } from '../../../../library/interfaces/card.interface';
import { ToggleProps } from '../../../../library/interfaces/toggle.interface';

export function getCategorieCard(): iCard[] {
  return [
    {
      titolo: 'Manga',
      urlPic: 'assets/images/manga.jpg',
      descrizione:
        'Scopri la mia collezione di manga, recensioni, letture in corso e consigli.',
      bottone: 'Esplora manga',
      routerLink: 'feature/manga',
      color: 'var(--primary)',
    },
    {
      titolo: 'Musica',
      urlPic: 'assets/images/musica.jpg',
      descrizione: 'Ascolta playlist, album preferiti e scopri nuovi artisti.',
      bottone: 'Vai alla musica',
      routerLink: '/musica',
      color: 'var(--primary)',
    },
    {
      titolo: 'Giochi',
      urlPic: 'assets/images/giochi.jpg',
      descrizione:
        'Tutto il mondo gaming: giochi provati, consigli e preferiti.',
      bottone: 'Scopri giochi',
      routerLink: '/giochi',
      color: 'var(--primary)',
    },
  ];
}

export function getToggleProps(): ToggleProps[] {
  return [
    {
      titolo: 'Account',
      icona: 'bi bi-person-circle',
      menuElementi: [
        {
          testo: 'Profilo',
          icona: 'bi bi-person',
          condition: true,
          azione: () => {},
        },
        {
          testo: 'Impostazioni',
          icona: 'bi bi-gear',
          condition: true,
          azione: () => {},
        },
      ],
    },
    {
      titolo: 'Auth',
      icona: 'bi bi-three-dots',
      menuElementi: [
        {
          testo: 'Esci',
          icona: 'bi bi-box-arrow-right',
          condition: true,
          azione: () => {},
        },
      ],
    },
  ];
}
