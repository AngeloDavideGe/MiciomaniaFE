import { Component, Input } from '@angular/core';
import { DataHttp } from '../../../core/api/http.data';
import { Lingua } from '../../../shared/interfaces/http.interface';
import { BottonCustomComponent } from './botton-custom.component';

@Component({
  selector: 'app-header-custom',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <header class="custom-header text-center">
      <div class="container">
        <h1 class="display-4 fw-bold mb-3">{{ titolo }}</h1>

        <p class="lead mb-4">
          {{ descrizione }}
        </p>

        <p class="h5 description">
          {{ messaggio }}
        </p>

        <div class="d-flex justify-content-center gap-3 mt-4 flex-wrap mb-2">
          @if (bottoni.length > 0) {
            @for (bottone of bottoni; track $index) {
              <app-botton-custom
                (clickBotton)="bottone.click()"
                [text]="bottone.titolo[lingua]"
                [icon1]="bottone.icona"
                [disabled]="bottone.disabled"
              ></app-botton-custom>
            }
          }
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .custom-header {
        padding: 1rem 0.5rem;
        background: linear-gradient(135deg, #1d2671, #c33764);
        color: #fff;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at top,
            rgba(255, 255, 255, 0.15),
            transparent 60%
          );
          pointer-events: none;
        }

        .container {
          animation: fadeUp 0.8s ease-out both;

          h1 {
            letter-spacing: -0.03em;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          }

          .lead {
            max-width: 720px;
            margin: 0 auto;
            opacity: 0.95;
          }

          .description {
            opacity: 0.8;
            font-style: italic;
          }

          .d-flex {
            .custom-btn {
              backdrop-filter: blur(6px);
              background: rgba(255, 255, 255, 0.9);
              border: none;
              border-radius: 999px;
              padding: 0.75rem 1.75rem;
              font-weight: 600;
              transition: all 0.25s ease;

              i {
                margin-right: 0.5rem;
              }

              &:hover:not(:disabled) {
                transform: translateY(-3px);
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
              }

              &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
              }
            }
          }
        }
      }
    `,
  ],
})
export class HeaderCustomComponent {
  public lingua: Lingua = DataHttp.lingua();
  @Input() titolo: string = '';
  @Input() messaggio: string = '';
  @Input() descrizione: string = '';
  @Input() bottoni: PulsantiHeader[] = [];
}

export interface PulsantiHeader {
  click: Function;
  disabled: boolean;
  titolo: Record<Lingua, string>;
  icona: string;
}
