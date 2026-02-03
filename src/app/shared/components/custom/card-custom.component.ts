import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonCustomComponent } from './botton-custom.component';

@Component({
  selector: 'app-card-custom',
  standalone: true,
  imports: [ButtonCustomComponent],
  template: `
    <div
      id="CardCustomComponent"
      class="card flex-shrink-0"
      style="scroll-snap-align: center;"
    >
      <img [src]="link" class="card-img-top" alt="..." />
      <div class="card-body" [class]="classBody">
        <h5 class="fw-bold">{{ titolo }}</h5>
        <p class="card-text">{{ descrizione }}</p>
        <div class="mt-auto">
          <app-button-custom
            [text]="titoloBottone"
            [icon1]="icona"
            (clickBotton)="clickBotton.emit()"
          ></app-button-custom>
        </div>
      </div>
    </div>
  `,
  styleUrl: '../styles/card-custom.scss',
})
export class CardCustomComponent {
  @Input() link!: string;
  @Input() titolo!: string;
  @Input() descrizione!: string;
  @Input() titoloBottone!: string;
  @Input() classBody: string = '';
  @Input() icona: string = '';
  // @Input()

  @Output() clickBotton = new EventEmitter<void>();
}
