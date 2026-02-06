import { Component, Input } from '@angular/core';
import { DataHttp } from '../../../core/api/http.data';
import { Lingua } from '../../../shared/interfaces/http.interface';
import { ButtonCustomComponent } from './botton-custom.component';

@Component({
  selector: 'app-header-custom',
  standalone: true,
  imports: [ButtonCustomComponent],
  template: `
    <header class="custom-header">
      <div class="header-container">
        <div class="header-content">
          <div class="title-section">
            <h1 class="header-title">{{ titolo }}</h1>
            <div class="title-line"></div>
          </div>

          <p class="header-description">
            {{ descrizione }}
          </p>

          @if (bottoni.length > 0) {
            <div class="actions-container">
              @for (bottone of bottoni; track $index) {
                <app-button-custom
                  (clickBotton)="bottone.click()"
                  [text]="bottone.titolo[lingua]"
                  [icon1]="bottone.icona"
                  [disabled]="bottone.disabled"
                ></app-button-custom>
              }
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .custom-header {
        background: linear-gradient(
          135deg,
          var(--text-color) 0%,
          var(--text-secondary) 50%,
          var(--text-muted) 100%
        );
        color: var(--bg-light);
        position: relative;
        overflow: hidden;
        padding: 1rem 1rem;
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
          sans-serif;

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 20% 30%,
              rgba(var(--primary-color), 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(168, 85, 247, 0.05) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .header-container {
          max-width: 1024px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .header-content {
          text-align: center;
          animation: fadeSlideUp 0.6s ease-out;
        }

        .title-section {
          display: inline-block;
          position: relative;
          margin-bottom: 0.5rem;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(
            135deg,
            var(--primary-hover) 0%,
            #a78bfa 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: -0.025em;
          margin: 0;
          line-height: 1.2;
        }

        .title-line {
          height: 3px;
          width: 60%;
          background: linear-gradient(
            90deg,
            transparent,
            var(--primary-hover),
            transparent
          );
          margin: 0.5rem auto 0;
          border-radius: 3px;
        }

        .header-description {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--border-color);
          max-width: 720px;
          margin: 0 auto 1rem;
          font-weight: 400;
          opacity: 0.9;
        }

        .actions-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          padding: 1rem 1rem;

          .header-title {
            font-size: 2rem;
          }

          .header-description {
            font-size: 1rem;
          }

          .stats-bar {
            gap: 1rem;
            flex-wrap: wrap;
          }

          .actions-container {
            gap: 0.75rem;
          }
        }
      }
    `,
  ],
})
export class HeaderCustomComponent {
  public lingua: Lingua = DataHttp.lingua();
  @Input() titolo: string = '';
  @Input() descrizione: string = '';
  @Input() bottoni: PulsantiHeader[] = [];
}

export interface PulsantiHeader {
  click: Function;
  disabled: boolean;
  titolo: Record<Lingua, string>;
  icona: string;
}
