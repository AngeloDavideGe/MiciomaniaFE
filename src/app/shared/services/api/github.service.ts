import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  Conquiste,
  GitHubType,
  Mappa,
  MN,
  Social,
} from '../../interfaces/github.interface';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  public social = signal<Social[]>([]);
  public mn = signal<MN[]>([]);
  public conquiste = signal<Conquiste | null>(null);

  public socialLoaded: boolean = false;
  public mnLoaded: boolean = false;
  public conquisteLoaded: boolean = false;

  getGistFormGithub(
    nome: string,
    id: string,
    nomeJson: string,
  ): Observable<GitHubType> {
    const jsonUrl = `https://gist.githubusercontent.com/${nome}/${id}/raw/${nomeJson}?t=${new Date().getTime()}`;

    const fetchPromise: Promise<GitHubType> = fetch(jsonUrl, {
      cache: 'no-store',
    }).then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nella richiesta');
      }
    });

    return from(fetchPromise);
  }
}
