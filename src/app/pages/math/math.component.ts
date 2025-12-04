import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MathHeaderComponent } from './components/math-header.component';
import { SelezionaOperazioneComponent } from './components/seleziona-operazione.component';
import { SimboliBase } from './interfaces/math.interface';
import { MathService } from './services/math.service';

@Component({
  selector: 'app-math',
  imports: [FormsModule, MathHeaderComponent, SelezionaOperazioneComponent],
  templateUrl: './math.component.html',
  styleUrl: './math.component.scss',
})
export class MathComponent implements OnInit {
  public mathService = inject(MathService);

  public selectedOperation: string = '';
  public keySimboli: (keyof SimboliBase)[] = [
    'costanti',
    'funzioni',
    'operatori',
    'simboliSpeciali',
  ];

  currentExpression: string = '';
  result: number | string | null = null;
  showKeyboard: boolean = false;

  ngOnInit(): void {}

  onOperationChange(operation: string): void {
    this.selectedOperation = operation;
  }

  toggleKeyboard(): void {
    this.showKeyboard = !this.showKeyboard;
  }

  insertCharacter(char: string): void {
    this.currentExpression += char + ' ';
  }

  calculate(): void {}

  clearInput(): void {
    this.currentExpression = '';
    this.result = null;
  }
}
