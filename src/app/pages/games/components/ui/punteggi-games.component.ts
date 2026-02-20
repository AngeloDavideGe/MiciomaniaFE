import { Component, Input } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { SquadreGiocatore } from '../../interfaces/games.interfaces';

@Component({
  selector: 'app-punteggi-games',
  standalone: true,
  imports: [],
  template: `
    <div class="punteggi-container">
      <!-- Header -->
      <div class="header-section">
        <div class="header-content">
          <i class="bi bi-trophy header-icon"></i>
          <h4 class="header-title">Sistema di Punteggio</h4>
        </div>
        <div class="header-line"></div>
      </div>

      <!-- Messaggio informativo -->
      <div class="info-section">
        <i class="bi bi-info-circle info-icon"></i>
        <div class="info-content">
          <p class="info-text">
            Se hai effettuato il login e completato l'iscrizione in home
            scegliendo una squadra, i punti guadagnati in questi minigiochi
            saranno assegnati alla tua squadra!
          </p>
        </div>
      </div>

      <!-- Sezione Punteggi Personali -->
      <div class="scores-section">
        <div class="scores-grid">
          <div class="score-card">
            <div class="score-label">
              <span>Punteggio Personale</span>
            </div>
            <div class="score-value personal-score">
              {{ punteggioPersonale }}
            </div>
          </div>

          <div class="score-card">
            <div class="score-label">
              <span>In Valutazione</span>
            </div>
            <div class="score-value pending-score">
              {{ punteggioOttenuto }}
            </div>
          </div>
        </div>
      </div>

      <!-- Squadre Giocatore -->
      <div class="teams-section">
        <div class="section-header">
          <i class="bi bi-people team-icon personal-icon"></i>
          <h6>Le Tue Squadre</h6>
        </div>

        @if (squadre.personale.length > 0) {
          <div class="teams-grid">
            @for (squadra of squadre.personale; track squadra.nome) {
              <div
                class="team-badge"
                [style.backgroundColor]="squadra.colore"
                [style.color]="'#ffffff'"
              >
                <i class="bi bi-star team-badge-icon"></i>
                <span class="team-name">{{ squadra.nome }}</span>
                <span class="team-score">{{ squadra.punteggio }}</span>
              </div>
            }
          </div>
        } @else {
          <div class="empty-state">
            <i class="bi bi-exclamation-circle empty-icon"></i>
            <span class="empty-text">Nessuna squadra assegnata</span>
          </div>
        }
      </div>

      <!-- Squadre Avversarie -->
      <div class="teams-section">
        <div class="section-header">
          <i class="bi bi-shield team-icon opponent-icon"></i>
          <h6>Squadre Avversarie</h6>
        </div>

        @if (squadre.avversario.length > 0) {
          <div class="teams-grid">
            @for (squadra of squadre.avversario; track squadra.nome) {
              <div
                class="team-badge"
                [style.backgroundColor]="squadra.colore"
                [style.color]="'#ffffff'"
              >
                <i class="bi bi-shield team-badge-icon"></i>
                <span class="team-name">{{ squadra.nome }}</span>
                <span class="team-score">{{ squadra.punteggio }}</span>
              </div>
            }
          </div>
        } @else {
          <div class="empty-state">
            <i class="bi bi-exclamation-circle empty-icon"></i>
            <span class="empty-text">Nessuna squadra avversaria</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .punteggi-container {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 24px;
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      }

      .header-section {
        margin-bottom: 24px;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .header-icon {
        font-size: 1.5rem;
        color: #f59e0b;
      }

      .header-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }

      .header-line {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
      }

      .info-section {
        display: flex;
        gap: 12px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;
      }

      .info-icon {
        font-size: 1.25rem;
        color: #3b82f6;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .info-content {
        flex: 1;
      }

      .info-text {
        font-size: 0.875rem;
        line-height: 1.5;
        color: #4b5563;
        margin: 0;
      }

      .scores-section {
        margin-bottom: 32px;
      }

      .scores-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .score-card {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 20px;
        transition: all 0.2s ease;

        &:hover {
          border-color: #d1d5db;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
      }

      .score-label {
        font-size: 0.75rem;
        font-weight: 500;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }

      .score-value {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
      }

      .personal-score {
        color: #2563eb;
      }

      .pending-score {
        color: #f59e0b;
      }

      .teams-section {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
      }

      .team-icon {
        font-size: 1.125rem;
      }

      .personal-icon {
        color: #059669;
      }

      .opponent-icon {
        color: #dc2626;
      }

      .section-header h6 {
        font-size: 0.875rem;
        font-weight: 600;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }

      .teams-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .team-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 10px 14px;
        border-radius: 10px;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1;
        transition: all 0.2s ease;

        &:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }
      }

      .team-badge-icon {
        font-size: 0.75rem;
        opacity: 0.9;
      }

      .team-name {
        white-space: nowrap;
      }

      .team-score {
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 8px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.75rem;
      }

      .empty-state {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #9ca3af;
        font-size: 0.875rem;
      }

      .empty-icon {
        font-size: 1rem;
      }

      .empty-text {
        font-style: italic;
      }

      @media (max-width: 768px) {
        .punteggi-container {
          padding: 20px;
        }

        .scores-grid {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .score-value {
          font-size: 1.75rem;
        }

        .teams-grid {
          flex-direction: column;
        }

        .team-badge {
          width: 100%;
          justify-content: space-between;
        }
      }

      @media (max-width: 480px) {
        .punteggi-container {
          padding: 16px;
          border-radius: 12px;
        }

        .header-content {
          gap: 8px;
        }

        .header-title {
          font-size: 1.125rem;
        }

        .info-section {
          padding: 12px;
        }
      }
    `,
  ],
})
export class PunteggiGamesComponent {
  @Input() punteggioPersonale!: number;
  @Input() squadre!: SquadreGiocatore;

  public punteggioOttenuto = DataHttp.punteggioOttenuto;
}
