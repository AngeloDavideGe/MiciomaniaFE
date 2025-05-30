import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Social } from '../interfaces/profilo.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public social: Social[] = [];

  constructor(private http: HttpClient) {
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
