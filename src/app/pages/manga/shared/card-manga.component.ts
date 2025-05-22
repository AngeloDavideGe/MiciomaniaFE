import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListaManga } from '../interfaces/manga.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card-manga',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="card shadow-sm h-100" style="width: 200px;">
      <img
        [src]="manga.copertina"
        alt="manga Copertina"
        class="card-img-top"
        style="height: 300px; object-fit: cover;"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-truncate">{{ manga.nome }}</h5>
        <p class="card-text"><strong>Autore:</strong> {{ manga.autore }}</p>
        <p class="card-text"><strong>Genere:</strong> {{ manga.genere }}</p>
        <div class="mt-auto">
          <div
            class="card-footer d-flex align-items-center justify-content-between p-0 border-0 bg-transparent"
          >
            <ng-container *ngIf="visualizzaPreferito; else removeTemplate">
              <button
                *ngIf="preferito; then stellaPreferita; else stellaNonPreferita"
                class="p-0 border-0 bg-transparent"
                style="font-size: 1.5rem"
              ></button>
            </ng-container>
            <button
              class="btn btn-primary btn-sm"
              (click)="selezionaOpera.emit()"
            >
              Leggi
            </button>
          </div>
        </div>
      </div>

      <ng-container *ngIf="seleziona">
        <div class="position-absolute top-0 end-0 p-2">
          <input
            type="checkbox"
            class="form-check-input border-warning custom-checkbox"
            (change)="clickCheckbox()"
            id="checkboxSeleziona"
          />
        </div>
      </ng-container>
    </div>

    <ng-template #removeTemplate>
      <button
        class="p-0 border-0 bg-transparent"
        style="font-size: 1.5rem"
        (click)="rimuoviPreferito.emit()"
      >
        <i class="bi bi-x"></i>
      </button>
    </ng-template>

    <ng-template #stellaPreferita>
      <i class="bi bi-star-fill stella-icon"></i>
    </ng-template>

    <ng-template #stellaNonPreferita>
      <i class="bi bi-star stella-icon"></i>
    </ng-template>
  `,
  styles: [
    `
      .custom-checkbox {
        border-width: 5.5px;
        border-radius: 0.25rem;
        padding: 9px;
        margin-top: -0.5rem;
      }
    `,
  ],
})
export class CardMangaComponent {
  public checkboxAttiva: boolean = false;

  @Input() manga: ListaManga = {} as ListaManga;
  @Input() visualizzaPreferito: boolean = true;
  @Input() seleziona: boolean = false;
  @Input() preferito: boolean = false;

  @Output() selezionaOpera = new EventEmitter<void>();
  @Output() rimuoviPreferito = new EventEmitter<void>();
  @Output() selezionato = new EventEmitter<boolean>();

  clickCheckbox(): void {
    this.checkboxAttiva = !this.checkboxAttiva;
    this.selezionato.emit(this.checkboxAttiva);
  }
}
