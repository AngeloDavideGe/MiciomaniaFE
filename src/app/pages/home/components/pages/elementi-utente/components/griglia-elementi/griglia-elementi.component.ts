import { Component, Input } from '@angular/core';
import { MangaMiciomaniaCardComponent } from './components/manga-miciomania-card.component';
import { CanzoniMiciomaniaCardComponent } from './components/canzoni-miciomania-card.component';
import { ElementiUtente } from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../../../shared/utilities/mangaSong.utilities';

@Component({
  selector: 'app-griglia-elementi',
  standalone: true,
  imports: [MangaMiciomaniaCardComponent, CanzoniMiciomaniaCardComponent],
  template: `
    <!-- Sezione Manga -->
    <div class="row g-4 justify-content-center align-items-stretch">
      @if (eu.manga && eu.manga.nome) {
      <div class="col-12 col-md-4 d-flex">
        <app-manga-miciomania-card
          [manga]="eu.manga"
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
          <p class="text-muted mb-0">Nessun manga caricato.</p>
        </div>
      </div>
      }

      <!-- Sezione Canzone -->
      @if (eu.canzone && eu.canzone.nome) {
      <div class="col-12 col-md-4 d-flex">
        <app-canzoni-miciomania-card
          [canzone]="eu.canzone"
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
          <p class="text-muted mb-0">Nessuna canzone caricata.</p>
        </div>
      </div>
      }

      <!-- Sezione Proposta -->
      @if (eu.proposta && eu.proposta.nome) {
      <div class="col-12 col-md-4 d-flex">
        @switch (eu.proposta.tipo) {
        <!-- Proposta Manga -->
        @case ('manga') {
        <app-manga-miciomania-card
          [manga]="eu.proposta"
          [mangaSongUtilities]="mangaSongUtilities"
        >
        </app-manga-miciomania-card>
        }
        <!-- Proposta Canzone -->
        @case ('canzone') {
        <app-canzoni-miciomania-card
          [canzone]="eu.proposta"
          [mangaSongUtilities]="mangaSongUtilities"
        ></app-canzoni-miciomania-card>
        } }
      </div>
      } @else {
      <div class="col-12 col-md-4">
        <div
          class="card shadow-sm d-flex flex-column align-items-center justify-content-center"
          style="width: 20rem; height: 36rem; padding: 1rem"
        >
          <p class="text-muted mb-2">
            {{
              creaProposta.controllo
                ? 'Non hai proposte in sospeso'
                : 'Hai gia manga e canzone'
            }}
          </p>
          <p class="text-muted mb-2">
            {{
              creaProposta.punteggio
                ? ''
                : 'Non hai abbastanza punti (' +
                  userPunteggio +
                  ' su ' +
                  punteggioNecessario +
                  ')'
            }}
          </p>
          @if (creaProposta.controllo && creaProposta.punteggio) {
          <button
            class="btn btn-outline-success btn-sm"
            style="border-radius: 20px"
            (click)="creaProposta.componente = true"
          >
            <i class="bi bi-plus-circle me-1"></i> Invia una nuova proposta
          </button>
          }
        </div>
      </div>
      }
    </div>
  `,
  styles: [``],
})
export class GrigliaElementiComponent {
  public mangaSongUtilities = new MangaSongUtilities();
  @Input() eu!: ElementiUtente;
  @Input() userPunteggio!: number;
  @Input() punteggioNecessario!: number;
  @Input() creaProposta!: {
    componente: boolean;
    controllo: boolean;
    punteggio: boolean;
  };
}
