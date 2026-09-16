import { Router } from '@angular/router';
import { iCard } from '../../../../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import { uppercaseFirstLetter } from '../../../../../../library/pipes/capitalize.pipe';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import { DescrizioneGiochi } from '../interfaces/giochi.interface';

export function getGiochi(lang: ILang['Giochi'], router: Router): iCard[] {
  return [
    {
      titolo: lang.Lista['Tris'].Titolo,
      urlPic: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948',
      descrizione: lang.Lista['Tris']?.Descrizione,
      bottone: lang.BottoneGioca,
      azione: () => router.navigate(['/feature/giochi/tris']),
    },
    {
      titolo: lang.Lista['BattagliaNavale'].Titolo,
      urlPic: 'https://images.unsplash.com/photo-1567613815648-6a3c7a7a4c5d',
      descrizione: lang.Lista['BattagliaNavale']?.Descrizione,
      bottone: lang.BottoneGioca,
      azione: () => router.navigate(['/feature/giochi/battagliaNavale']),
    },
  ];
}

export function defaultGiochiArrayPags(): RaggioPage[] {
  return [
    { width: 1904, raggio: 5 },
    { width: 1591.2, raggio: 4 },
    { width: 1279.2, raggio: 3 },
    { width: 986.4, raggio: 2 },
    { width: 0, raggio: 1 },
  ];
}

export function getGiochiDescrizione(
  url: string,
  lang: ILang['Giochi'],
): DescrizioneGiochi {
  const giochiUrlIndex = url.split('/').indexOf('giochi');
  const gameRouteKey = url.split('/')[giochiUrlIndex + 1];
  const gameKey = gameRouteKey ? uppercaseFirstLetter(gameRouteKey) : undefined;
  const currentLang = gameKey ? lang.Lista[gameKey] : undefined;

  if (currentLang) {
    return {
      Titolo: currentLang.Titolo,
      Descrizione: currentLang.Descrizione,
    };
  } else {
    return {
      Titolo: lang.Titolo,
      Descrizione: lang.Descrizione,
    };
  }
}
