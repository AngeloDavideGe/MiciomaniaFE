import { Component, inject, OnInit } from '@angular/core';
import { CasualQuiz, Quiz, Risposta } from '../../interfaces/games.interfaces';
import { getCasualQuiz } from '../../functions/quiz.function';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { take } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
import { DettagliGameComponent } from '../../shared/dettagli-game.component';
import { GamesCustom } from '../../shared/games-custom.class';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, DettagliGameComponent],
  templateUrl: './quiz.component.html',
})
export class QuizComponent extends GamesCustom implements OnInit {
  public domandaCurrent: Quiz = {} as Quiz;
  public rispostaSelezionata: Risposta | null = null;
  public rispostaConfermata: boolean = false;
  public numDomanda: number = 1;

  private quizService = inject(QuizService);
  private loadinService = inject(LoadingService);

  ngOnInit(): void {
    this.domandaCurrent = getCasualQuiz() as Quiz;
    this.loadQuiz();
  }

  private loadQuiz(): void {
    if (this.quizService.quiz.length == 0) {
      this.quizService
        .getGistFormGithub(
          'AngeloDavideGe',
          'c4a646a0fbe86f97fbcf4520af119386',
          'Quiz.json'
        )
        .pipe(take(1))
        .subscribe({
          next: (quiz) => {
            this.quizService.quiz = quiz;
            this.quizService.quizFilter = structuredClone(quiz);
            this.loadinService.hide();
          },
          error: (err) => {
            console.error('errore nel recupero domande', err);
          },
        });
    }
  }

  domandaNext(): void {
    this.rispostaSelezionata = null;
    this.rispostaConfermata = false;

    if (this.numDomanda == 1 && this.quizService.quiz.length == 0) {
      this.loadinService.show();
    } else if (this.numDomanda < 5) {
      this.selectDomanda(
        getCasualQuiz(this.quizService.quizFilter) as CasualQuiz
      );
    }
  }

  private selectDomanda(casualQuiz: CasualQuiz) {
    this.quizService.restoreQuizFilter(casualQuiz, this.numDomanda !== 1);
    this.domandaCurrent = casualQuiz.quiz;
    this.numDomanda++;
  }

  confermaRisposta(): void {
    this.rispostaConfermata = true;
    if (this.rispostaSelezionata?.soluzione) {
      this.squadreService.setPunteggioOttenuto = 1;
    } else {
      this.squadreService.setPunteggioOttenuto = -1;
    }
  }

  ricomincia(): void {
    this.rispostaSelezionata = null;
    this.rispostaConfermata = false;
    this.numDomanda = 1;
    this.domandaCurrent = getCasualQuiz() as Quiz;
  }
}
