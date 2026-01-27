import { Component } from '@angular/core';

@Component({
  selector: 'app-error-http',
  standalone: true,
  imports: [],
  template: `
    <div
      class="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light"
    >
      <div class="error-container p-4 rounded shadow">
        <div class="icon mb-3">🚧</div>
        <h1 class="text-danger mb-3">Servizio non disponibile</h1>
        <p class="text-muted mb-4">
          Attualmente il servizio non è disponibile. Si prega di riprovare più
          tardi.
        </p>
        <div>
          <button class="btn btn-primary me-2 px-4 py-2" (click)="retry()">
            Riprova
          </button>
          <button
            class="btn btn-outline-secondary px-4 py-2"
            routerLink="/home"
          >
            Ritorna alla home
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .error-container {
        max-width: 500px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        .icon {
          font-size: 50px;
          color: #e63946;
        }

        h1 {
          font-size: 24px;
          font-weight: bold;
        }

        p {
          font-size: 16px;
          color: #6c757d;
        }

        button {
          font-size: 16px;
          border-radius: 8px;
          transition: all 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    `,
  ],
})
export class ErrorHttpComponent {
  retry() {
    window.location.reload();
  }
}
