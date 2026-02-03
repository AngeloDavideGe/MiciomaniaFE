import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
      <img [src]="link" [style]="{ height: altezzaImg }" />

      <div class="card-body" [class]="classBody">
        <h5 class="fw-bold">{{ titolo }}</h5>
        <p class="card-text">{{ descrizione }}</p>
        <div class="mt-auto">
          @switch (tipo) {
            @case ('Default') {
              <app-button-custom
                [text]="titoloBottone"
                [icon1]="icona"
                (clickBotton)="clickBotton.emit()"
              ></app-button-custom>
            }
            @case ('Manga') {
              <a
                (click)="clickBotton.emit()"
                target="_blank"
                class="btn btn-success w-100 button-manga"
              >
                <i class="bi bi-download me-2"></i>
                {{ titoloBottone }}
              </a>
            }
            @case ('Song') {
              <button
                (click)="clickSongButton()"
                class="btn btn-success btn-sm"
                style=""
              >
                {{ songButton() ? '▶ Ascolta' : '⏹ Stop' }}
              </button>
            }
          }
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
  @Input() altezzaImg: string = '13rem';
  @Input() tipo: 'Default' | 'Manga' | 'Song' = 'Default';

  @Output() clickBotton = new EventEmitter<void>();
  @Output() click2Botton = new EventEmitter<void>();

  public songButton = signal<boolean>(true);

  public clickSongButton(): void {
    this.songButton() ? this.clickBotton.emit() : this.click2Botton.emit();
    this.songButton.update((x: boolean) => !x);
  }
}
