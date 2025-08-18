import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { getCasualQuiz } from '../../../functions/quiz.function';
import { CasualQuiz } from '../../../interfaces/games.interfaces';
import { GamesBase } from '../../../shared/base/games.base';
import { DettagliGameComponent } from '../../../shared/components/dettagli-game.component';
import { GitHubService } from '../../../../../shared/services/api/github.service';
import {
  Quiz,
  Risposta,
} from '../../../../../shared/interfaces/github.interface';
import { setPunteggioOttenuto } from '../../../../../shared/handlers/squadre.handler';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, DettagliGameComponent],
  templateUrl: './quiz.component.html',
})
export class QuizComponent extends GamesBase implements OnInit {
  public domandaCurrent: Quiz = {} as Quiz;
  public rispostaSelezionata: Risposta | null = null;
  public rispostaConfermata: boolean = false;
  public numDomanda: number = 1;

  private gitHubService = inject(GitHubService);
  private loadinService = inject(LoadingService);

  ngOnInit(): void {
    this.domandaCurrent = getCasualQuiz() as Quiz;
    this.loadQuiz();
  }

  private loadQuiz(): void {
    if (this.gitHubService.quiz.length == 0) {
      this.gitHubService
        .getGistFormGithub(
          'AngeloDavideGe',
          'c4a646a0fbe86f97fbcf4520af119386',
          'Quiz.json'
        )
        .pipe(take(1))
        .subscribe({
          next: (quiz) => {
            this.gitHubService.quiz = quiz as Quiz[];
            this.gitHubService.quizFilter = structuredClone(quiz as Quiz[]);
            this.loadinService.hide();
          },
          error: (err) => console.error('errore nel recupero domande', err),
        });
    }
  }

  domandaNext(): void {
    this.rispostaSelezionata = null;
    this.rispostaConfermata = false;

    if (this.numDomanda == 1 && this.gitHubService.quiz.length == 0) {
      this.loadinService.show();
    } else if (this.numDomanda < 5) {
      this.selectDomanda(
        getCasualQuiz(this.gitHubService.quizFilter) as CasualQuiz
      );
    }
  }

  private selectDomanda(casualQuiz: CasualQuiz) {
    this.gitHubService.restoreQuizFilter(casualQuiz, this.numDomanda !== 1);
    this.domandaCurrent = casualQuiz.quiz;
    this.numDomanda++;
  }

  confermaRisposta(): void {
    this.rispostaConfermata = true;
    if (this.rispostaSelezionata?.soluzione) {
      setPunteggioOttenuto(1);
    } else {
      setPunteggioOttenuto(-1);
    }
  }

  ricomincia(): void {
    this.rispostaSelezionata = null;
    this.rispostaConfermata = false;
    this.numDomanda = 1;
    this.domandaCurrent = getCasualQuiz() as Quiz;
  }
}
