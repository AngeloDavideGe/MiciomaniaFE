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
    <!-- Sezione Manga, Canzone e Proposta -->
    <div class="row g-4 g-xl-5 justify-content-center align-items-stretch">
      <!-- Sezione Manga -->
      <div class="col-12 col-lg-4 col-md-6 col-xxl-4 d-flex">
        <div class="card-container w-100">
          @if (eu.mangaUtente.idUtente) {
          <app-manga-miciomania-card
            [manga]="eu.mangaUtente"
            [mangaSongUtilities]="mangaSongUtilities"
            class="fixed-size-card"
          >
          </app-manga-miciomania-card>
          } @else {
          <div class="card empty-state-card fixed-size-card">
            <div
              class="card-body d-flex flex-column align-items-center justify-content-center text-center p-4"
            >
              <div class="empty-state-icon mb-3">
                <i class="bi bi-book display-4 text-muted"></i>
              </div>
              <p class="text-muted mb-0">
                {{ elemLang.noManga }}
              </p>
            </div>
          </div>
          }
        </div>
      </div>

      <!-- Sezione Canzone -->
      <div class="col-12 col-lg-4 col-md-6 col-xxl-4 d-flex">
        <div class="card-container w-100">
          @if (eu.canzoniUtente.idUtente) {
          <app-canzoni-miciomania-card
            [canzone]="eu.canzoniUtente"
            [mangaSongUtilities]="mangaSongUtilities"
            class="fixed-size-card"
          ></app-canzoni-miciomania-card>
          } @else {
          <div class="card empty-state-card fixed-size-card">
            <div
              class="card-body d-flex flex-column align-items-center justify-content-center text-center p-4"
            >
              <div class="empty-state-icon mb-3">
                <i class="bi bi-music-note-beamed display-4 text-muted"></i>
              </div>
              <p class="text-muted mb-0">
                {{ elemLang.noCanzone }}
              </p>
            </div>
          </div>
          }
        </div>
      </div>

      <!-- Sezione Proposta -->
      <div class="col-12 col-lg-4 col-md-6 col-xxl-4 d-flex">
        <div class="card-container w-100">
          <div class="card proposal-card fixed-size-card">
            <div
              class="card-body d-flex flex-column align-items-center justify-content-center text-center p-4"
            >
              @if (creaProposta.punteggio) {
              <div class="proposal-content">
                <div class="mb-3">
                  <i class="bi bi-send-check display-4 text-success"></i>
                </div>
                <p class="text-muted mb-3">
                  {{ elemLang.noProposteSospese }}
                </p>
                <button
                  class="btn btn-outline-success btn-lg rounded-pill px-4"
                  style="border-radius: 20px"
                  (click)="creaProposta.componente = true"
                >
                  <i class="bi bi-plus-circle me-1"></i>
                  {{ elemLang.inviaProposta }}
                </button>
              </div>
              } @else {
              <div class="proposal-content">
                <div class="mb-3">
                  <i class="bi bi-send display-4 text-muted"></i>
                </div>
                <p class="text-muted mb-2">
                  {{ elemLang.noProposteSospese }}
                </p>
                <p class="text-muted mb-4">
                  {{
                    elemLang.nonHaiPunti +
                      ' (' +
                      userPunteggio +
                      ' su ' +
                      punteggioNecessario +
                      ')'
                  }}
                </p>
                <button
                  class="btn btn-outline-secondary btn-lg rounded-pill px-4"
                  style="border-radius: 20px"
                  disabled
                >
                  <i class="bi bi-lock me-1"></i>
                  {{ elemLang.inviaProposta }}
                </button>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card-container {
        height: 100%;
        display: flex;
        justify-content: center;
        min-width: 0; // Importante per gestire overflow
      }

      .fixed-size-card {
        width: 100%;
        height: 36rem;
        display: flex;
        flex-direction: column;
        min-width: 0; // Previene che il contenuto esca dalla card
      }

      // Regole responsive per l'altezza delle card
      @media (max-width: 768px) {
        .fixed-size-card {
          height: 32rem; // Riduce altezza su mobile
        }
      }

      @media (max-width: 576px) {
        .fixed-size-card {
          height: 28rem; // Riduce ulteriormente su schermi piccoli
          max-width: 100%;
        }

        .col-12 {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
      }

      // Ottimizzazione per schermi molto piccoli
      @media (max-width: 375px) {
        .fixed-size-card {
          height: 26rem;
        }

        .card-body {
          padding: 1rem !important;
        }
      }

      // Gestione spazi orizzontali
      @media (min-width: 1400px) {
        .row {
          margin-left: -0.75rem;
          margin-right: -0.75rem;
        }

        .col-xxl-4 {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }
      }

      // Breakpoint per evitare che le card si tocchino
      @media (max-width: 1199px) and (min-width: 768px) {
        .row {
          margin-left: -0.5rem;
          margin-right: -0.5rem;
        }

        .col-md-6,
        .col-lg-4 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          max-width: 50%; // Forza 2 card per riga su tablet
        }

        .fixed-size-card {
          margin-bottom: 0.5rem;
        }
      }

      // Forza i componenti Angular ad adattarsi alla dimensione fissa
      app-manga-miciomania-card.fixed-size-card,
      app-canzoni-miciomania-card.fixed-size-card {
        display: block;
        height: 100%;
        width: 100%;

        ::ng-deep {
          .card {
            height: 100%;
            width: 100%;
            min-width: 0;
          }

          // Assicura che il contenuto interno non esca mai
          * {
            max-width: 100%;
          }
        }
      }

      .empty-state-card {
        border: 2px dashed #dee2e6;
        background-color: #f8f9fa;

        .card-body {
          height: 100%;
          width: 100%;
        }

        .empty-state-icon {
          opacity: 0.5;
        }
      }

      .proposal-card {
        border: 2px solid #e9ecef;
        background: white;

        .card-body {
          height: 100%;
          width: 100%;
        }
      }

      .card-wrapper,
      .proposal-card {
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-4px);
        }
      }

      .btn {
        transition: all 0.3s ease;

        &:not(:disabled):hover {
          transform: scale(1.05);
        }
      }

      .btn-outline-success:not(:disabled) {
        animation: subtle-pulse 2s infinite;
      }

      // Utility per gestire overflow
      .flex-basis-100 {
        flex-basis: 100%;
      }

      // Assicura che le card non si sovrappongano mai
      @supports (display: grid) {
        @media (max-width: 767px) {
          .row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .col-12 {
            width: 100%;
            max-width: 100%;
          }
        }
      }

      // Animazione per il pulsante
      @keyframes subtle-pulse {
        0%,
        100% {
          box-shadow: 0 0 0 0 rgba(25, 135, 84, 0.2);
        }
        50% {
          box-shadow: 0 0 0 5px rgba(25, 135, 84, 0);
        }
      }
    `,
  ],
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
