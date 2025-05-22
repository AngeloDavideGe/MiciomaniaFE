import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CasualQuiz, Quiz } from '../interfaces/games.interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public quiz: Quiz[] = [];
  public quizFilter: Quiz[] = [];

  restoreQuizFilter(casualQuiz: CasualQuiz, cond: boolean): void {
    if (cond) {
      this.quizFilter.splice(casualQuiz.index, 1);

      if (this.quizFilter.length == 0) {
        this.quizFilter = structuredClone(this.quiz);
      }
    }
  }

  getGistFormGithub(
    nome: string,
    id: string,
    nomeJson: string
  ): Observable<Quiz[]> {
    const jsonUrl = `https://gist.githubusercontent.com/${nome}/${id}/raw/${nomeJson}?t=${new Date().getTime()}`;

    // Usa fetch per disabilitare la cache
    const fetchPromise: Promise<Quiz[]> = fetch(jsonUrl, {
      cache: 'no-store',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Errore nella richiesta');
      }
    });

    // Converti la Promise in un Observable
    return from(fetchPromise);
  }
}
