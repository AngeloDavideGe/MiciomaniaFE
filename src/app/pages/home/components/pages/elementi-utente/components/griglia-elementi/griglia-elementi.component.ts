import { Component, Input } from '@angular/core';
import { MangaMiciomaniaCardComponent } from './components/manga-miciomania-card.component';
import { CanzoniMiciomaniaCardComponent } from './components/canzoni-miciomania-card.component';
import { MangaSongUtilities } from '../../../../../../../shared/utilities/mangaSong.utilities';
import { ElemLang } from '../../languages/interfaces/elem-lang.interface';
import { UtenteParodie } from '../../../../../../../shared/interfaces/elementiUtente.interface';

@Component({
  selector: 'app-griglia-elementi',
  standalone: true,
  imports: [MangaMiciomaniaCardComponent, CanzoniMiciomaniaCardComponent],
  template: `
    <!-- Sezione Manga -->
    <div class="row g-4 justify-content-center align-items-stretch">
      @if (eu.mangaUtente) {
      <div class="col-12 col-md-4 d-flex">
        <app-manga-miciomania-card
          [manga]="eu.mangaUtente"
          [mangaSongUtilities]="mangaSongUtilities"
        >
        </app-manga-miciomania-card>
      </div>
      } @else {
      <div class="col-12 col-md-4">
        <div
          class="card shadow-sm"
          style="
          width: 20rem;
          height: 36rem;
          display: flex;
          align-items: center;
          justify-content: center;
        "
        >
          <p class="text-muted mb-0">
            {{ elemLang.noManga }}
          </p>
        </div>
      </div>
      }

      <!-- Sezione Canzone -->
      @if (eu.canzoniUtente && eu.canzoniUtente.nome) {
      <div class="col-12 col-md-4 d-flex">
        <app-canzoni-miciomania-card
          [canzone]="eu.canzoniUtente"
          [mangaSongUtilities]="mangaSongUtilities"
        ></app-canzoni-miciomania-card>
      </div>
      } @else {
      <div class="col-12 col-md-4">
        <div
          class="card shadow-sm"
          style="
          width: 20rem;
          height: 36rem;
          display: flex;
          align-items: center;
          justify-content: center;
        "
        >
          <p class="text-muted mb-0">
            {{ elemLang.noCanzone }}
          </p>
        </div>
      </div>
      }

      <!-- Sezione Proposta -->
      <div class="col-12 col-md-4">
        <div
          class="card shadow-sm d-flex flex-column align-items-center justify-content-center"
          style="width: 20rem; height: 36rem; padding: 1rem"
        >
          <p class="text-muted mb-2">
            {{ elemLang.noProposteSospese }}
          </p>
          <p class="text-muted mb-2">
            {{
              creaProposta.punteggio
                ? ''
                : elemLang.nonHaiPunti +
                  '(' +
                  userPunteggio +
                  ' su ' +
                  punteggioNecessario +
                  ')'
            }}
          </p>
          @if (creaProposta.punteggio) {
          <button
            class="btn btn-outline-success btn-sm"
            style="border-radius: 20px"
            (click)="creaProposta.componente = true"
          >
            <i class="bi bi-plus-circle me-1"></i>
            {{ elemLang.inviaProposta }}
          </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class GrigliaElementiComponent {
  public mangaSongUtilities = new MangaSongUtilities();
  @Input() elemLang!: ElemLang;
  @Input() eu!: UtenteParodie;
  @Input() userPunteggio!: number;
  @Input() punteggioNecessario!: number;
  @Input() creaProposta!: {
    componente: boolean;
    punteggio: boolean;
  };
}
