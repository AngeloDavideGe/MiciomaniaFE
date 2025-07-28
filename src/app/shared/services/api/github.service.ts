import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Social } from '../../interfaces/github.interface';
import {
  CasualQuiz,
  Quiz,
} from '../../../pages/games/interfaces/games.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  public social: Social[] = [];

  public quiz: Quiz[] = [];
  public quizFilter: Quiz[] = [];

  constructor() {
    this.loadDataFromStorage();
  }

  getGistFormGithub(
    nome: string,
    id: string,
    nomeJson: string
  ): Observable<Social[] | Quiz[]> {
    const jsonUrl = `https://gist.githubusercontent.com/${nome}/${id}/raw/${nomeJson}?t=${new Date().getTime()}`;

    const fetchPromise: Promise<Social[] | Quiz[]> = fetch(jsonUrl, {
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

  restoreQuizFilter(casualQuiz: CasualQuiz, cond: boolean): void {
    if (cond) {
      this.quizFilter.splice(casualQuiz.index, 1);

      if (this.quizFilter.length == 0) {
        this.quizFilter = structuredClone(this.quiz);
      }
    }
  }

  private loadDataFromStorage(): void {
    const social = sessionStorage.getItem('socialLinks');
    if (social) {
      this.social = JSON.parse(social);
    }
  }
}
