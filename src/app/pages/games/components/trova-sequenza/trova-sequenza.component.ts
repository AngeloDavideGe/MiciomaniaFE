import { Component, OnInit } from '@angular/core';
import { ValueSequenza } from '../../enums/games.enum';
import { games_imports } from '../../shared/games.imports';

@Component({
  selector: 'app-trova-sequenza',
  standalone: true,
  imports: games_imports,
  templateUrl: './trova-sequenza.component.html',
  styles: ``,
})
export class TrovaSequenzaComponent implements OnInit {
  public valueGame = ValueSequenza;
  public tentativiRestanti: number = 0;
  public numbers: number[][] = [];
  public selectedNumbers: number[] = [];
  public gameWon = false;
  public wrongSequence = false;

  ngOnInit(): void {
    this.initializeGame();
  }

  private initializeGame(): void {
    this.tentativiRestanti = structuredClone(this.valueGame.tentativi);
    const uniqueNumbers: number[] = this.generateUniqueNumbers(
      1,
      50,
      this.valueGame.gridSize * this.valueGame.gridSize
    );

    for (let i = 0; i < this.valueGame.gridSize; i++) {
      const row = [];
      for (let j = 0; j < this.valueGame.gridSize; j++) {
        row.push(uniqueNumbers[i * this.valueGame.gridSize + j]);
      }
      this.numbers.push(row);
    }
  }

  private generateUniqueNumbers(
    min: number,
    max: number,
    count: number
  ): number[] {
    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
  }

  selectNumber(number: number): void {
    if (this.selectedNumbers.includes(number)) {
      return;
    }

    this.selectedNumbers.push(number);

    if (
      this.selectedNumbers.length ===
      this.valueGame.gridSize * this.valueGame.gridSize
    ) {
      const correctSequence: number[] = this.numbers
        .flat()
        .sort((a, b) => a - b);
      this.gameWon = this.selectedNumbers.every(
        (num, index) => num === correctSequence[index]
      );

      if (!this.gameWon) {
        this.wrongSequence = true;
        setTimeout(() => {
          this.riprova();
          this.tentativiRestanti--;
        }, 2500);
      }
    }
  }

  private riprova(): void {
    this.selectedNumbers = [];
    this.wrongSequence = false;
  }

  resetGame(): void {
    this.gameWon = false;
    this.numbers = [];
    this.riprova();
    this.initializeGame();
  }
}
