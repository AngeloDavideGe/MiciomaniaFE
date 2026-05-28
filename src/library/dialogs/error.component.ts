import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ErrorParams } from '../interfaces/error.interface';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error">
      <div class="error__card">
        <div class="error__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A1 1 0 003.65 18h16.7a1 1 0 00.86-1.5l-7.5-13a1 1 0 00-1.72 0z"
            />
          </svg>
        </div>

        <div class="error__badge">Errore</div>

        <h1 class="error__title">
          {{ error()?.title ?? 'Qualcosa è andato storto' }}
        </h1>

        <p class="error__message">
          {{
            error()?.message ??
              'Si è verificato un errore durante la richiesta.'
          }}
        </p>

        <div class="error__actions">
          <button class="btn btn--primary" (click)="goHome()">Home</button>

          <button class="btn btn--secondary" (click)="goBack()">
            Indietro
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: var(--bg-light);
      display: grid;
      place-items: center;
      padding: 24px;
    }

    /* ===== ERROR WRAPPER ===== */
    .error {
      width: 100%;
      display: flex;
      justify-content: center;

      &__card {
        width: 100%;
        max-width: 520px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 28px 24px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        animation: fadeIn 0.25s ease-out;
      }

      &__icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(237, 73, 86, 0.1);
        color: var(--red-miciomania);

        svg {
          width: 30px;
          height: 30px;
        }
      }

      &__badge {
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(237, 73, 86, 0.12);
        color: var(--red-miciomania);
        margin-bottom: 14px;
      }

      &__title {
        margin: 0;
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--text-color);
        letter-spacing: -0.02em;
      }

      &__message {
        margin-top: 10px;
        font-size: 0.95rem;
        line-height: 1.5;
        color: var(--text-secondary);
      }

      &__actions {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    /* ===== BUTTONS ===== */
    .btn {
      border: 1px solid transparent;
      border-radius: 12px;
      padding: 10px 14px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.15s ease;
      min-width: 140px;

      &:hover {
        transform: translateY(-1px);
      }

      &--primary {
        background: var(--primary-color);
        color: white;

        &:hover {
          background: var(--primary-hover);
        }
      }

      &--secondary {
        background: var(--surface-color);
        border-color: var(--border-color);
        color: var(--text-color);

        &:hover {
          background: var(--bg-lighter);
        }
      }
    }

    /* ===== ANIMATION ===== */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ===== MOBILE ===== */
    @media (max-width: 600px) {
      .error__card {
        padding: 20px;
        border-radius: 16px;
      }

      .btn {
        width: 100%;
      }
    }
  `,
})
export class ErrorPageComponent {
  private errorService = inject(ErrorService);
  private router = inject(Router);

  public error = computed<ErrorParams | null>(() => this.errorService.error());

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public goBack(): void {
    window.history.back();
  }
}
