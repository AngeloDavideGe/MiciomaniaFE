import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CasualQuiz } from '../../../pages/games/interfaces/games.interfaces';
import { GitHubType, MN, Quiz } from '../../interfaces/github.interface';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  public quiz: Quiz[] = [];
  public quizFilter: Quiz[] = [];
  public mn: MN[] = [];

  getGistFormGithub(
    nome: string,
    id: string,
    nomeJson: string
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

  restoreQuizFilter(casualQuiz: CasualQuiz, cond: boolean): void {
    if (cond) {
      this.quizFilter.splice(casualQuiz.index, 1);

      if (this.quizFilter.length == 0) {
        this.quizFilter = structuredClone(this.quiz);
      }
    }
  }
}
