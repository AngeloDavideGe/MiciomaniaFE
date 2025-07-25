import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Social } from '../interfaces/profilo.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public social: Social[] = [];

  constructor() {
    this.loadMangaFromStorage();
  }

  getGistFormGithub(
    nome: string,
    id: string,
    nomeJson: string
  ): Observable<Social[]> {
    const jsonUrl = `https://gist.githubusercontent.com/${nome}/${id}/raw/${nomeJson}?t=${new Date().getTime()}`;

    const fetchPromise: Promise<Social[]> = fetch(jsonUrl, {
      cache: 'no-store',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nella richiesta');
      }
    });

    return from(fetchPromise);
  }

  private loadMangaFromStorage(): void {
    const social = sessionStorage.getItem('socialLinks');
    if (social) {
      this.social = JSON.parse(social);
    }
  }
}
