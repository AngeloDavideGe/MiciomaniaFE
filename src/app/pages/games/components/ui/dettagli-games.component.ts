import { Component, Input } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { SquadreGiocatore } from '../../interfaces/games.interfaces';

@Component({
  selector: 'app-punteggi-games',
  standalone: true,
  imports: [],
  template: `
    <div class="punteggi-container mt-5 p-4 rounded-4 shadow-lg">
      <!-- Header -->
      <div class="header-section mb-4 pb-3 border-bottom">
        <h4 class="fw-bold text-dark mb-0">
          <i class="bi bi-trophy-fill me-2" style="color: #ffc107;"></i>
          Sistema di Punteggio
        </h4>
      </div>

      <!-- Messaggio informativo -->
      <div class="info-message p-3 rounded-3 mb-4" style="background: #f0f7ff;">
        <p class="mb-0 text-dark">
          <i class="bi bi-info-circle me-2"></i>
          Se hai effettuato il login e completato l'iscrizione in home
          scegliendo una squadra, i punti guadagnati in questi minigiochi
          saranno assegnati alla tua squadra!
        </p>
      </div>

      <!-- Sezione Punteggi Personali -->
      <div class="scores-section mb-4">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <div class="score-card p-3 rounded-3">
              <small class="text-muted fw-semibold">Punteggio Personale</small>
              <div class="score-value mt-2">
                <span class="badge badge-personal">{{
                  punteggioPersonale
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="score-card p-3 rounded-3">
              <small class="text-muted fw-semibold">In Valutazione</small>
              <div class="score-value mt-2">
                <span class="badge badge-pending">{{ punteggioOttenuto }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Squadre Giocatore -->
      <div class="squadre-section mb-4">
        <h6 class="fw-bold text-dark mb-3">
          <i class="bi bi-people-fill me-2" style="color: #28a745;"></i>
          Le Tue Squadre
        </h6>
        @if (squadre.personale.length > 0) {
        <div class="d-flex flex-wrap gap-2">
          @for (squadra of squadre.personale; track squadra.nome) {
          <span
            class="badge fw-semibold p-2 rounded-3"
            [style.backgroundColor]="squadra.colore"
            [style.color]="getTextColor(squadra.colore)"
          >
            <i class="bi bi-star-fill me-1"></i>
            {{ squadra.nome }}
            <span class="badge badge-light ms-2">
              {{ squadra.punteggio }}
            </span>
          </span>
          }
        </div>
        } @else {
        <p class="text-muted mb-0">
          <i class="bi bi-exclamation-circle me-2"></i>
          Nessuna squadra assegnata
        </p>
        }
      </div>

      <!-- Squadre Avversarie -->
      <div class="squadre-section">
        <h6 class="fw-bold text-dark mb-3">
          <i class="bi bi-shield-fill me-2" style="color: #dc3545;"></i>
          Squadre Avversarie
        </h6>
        @if (squadre.avversario.length > 0) {
        <div class="d-flex flex-wrap gap-2">
          @for (squadra of squadre.avversario; track squadra.nome) {
          <span
            class="badge fw-semibold p-2 rounded-3"
            [style.backgroundColor]="squadra.colore"
            [style.color]="getTextColor(squadra.colore)"
          >
            <i class="bi bi-shield-exclamation me-1"></i>
            {{ squadra.nome }}
            <span class="badge badge-light ms-2">
              {{ squadra.punteggio }}
            </span>
          </span>
          }
        </div>
        } @else {
        <p class="text-muted mb-0">
          <i class="bi bi-exclamation-circle me-2"></i>
          Nessuna squadra avversaria
        </p>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .punteggi-container {
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border: 1px solid #e9ecef;

        .header-section h4 {
          font-size: 1.35rem;
          letter-spacing: 0.5px;
        }

        .info-message {
          border-left: 4px solid #0d6efd;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .scores-section {
          .score-card {
            background: #fff;
            border: 1px solid #dee2e6;
            transition: all 0.3s ease;

            &:hover {
              border-color: #0d6efd;
              box-shadow: 0 4px 12px rgba(13, 110, 253, 0.1);
            }

            small {
              font-size: 0.85rem;
              letter-spacing: 0.5px;
            }

            .score-value {
              font-size: 1.5rem;
            }
          }
        }

        .badge-personal {
          background: linear-gradient(135deg, #0d6efd 0%, #0055cc 100%);
          color: white;
          font-size: 1.25rem;
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
        }

        .badge-pending {
          background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
          color: #333;
          font-size: 1.25rem;
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
        }

        .squadre-section {
          h6 {
            font-size: 1.05rem;
            letter-spacing: 0.5px;
          }

          .badge {
            padding: 0.75rem 1rem !important;
            font-size: 0.95rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .badge-light {
              font-weight: 700;
              padding: 0.25rem 0.5rem !important;
              font-size: 0.85rem;
            }
          }
        }
      }

      @media (max-width: 576px) {
        .punteggi-container {
          padding: 1.5rem !important;

          .header-section h4 {
            font-size: 1.1rem;
          }

          .squadre-section .badge {
            font-size: 0.85rem;
            padding: 0.5rem 0.75rem !important;
          }
        }
      }
    `,
  ],
})
export class PunteggiGamesComponent {
  public punteggioOttenuto = DataHttp.punteggioOttenuto;
  @Input() punteggioPersonale!: number;
  @Input() squadre!: SquadreGiocatore;

  // Funzione per calcolare il colore del testo in base al background
  getTextColor(bgColor: string): string {
    const color = bgColor.replace('#', '');
    if (color.length === 6) {
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance > 150 ? '#222' : '#fff';
    }
    return '#fff';
  }
}
