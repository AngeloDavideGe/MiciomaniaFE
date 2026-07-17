import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-descrizione-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="descrizione-micio">
      <div class="overlay" [style.background-image]="'url(' + immagine() + ')'">
        <div class="contenuto">
          <h1>{{ titolo() }}</h1>

          <p>
            {{ descrizione() }}
          </p>

          <div class="mt-3">
            <ng-content select="[half-row]"></ng-content>
          </div>
        </div>
      </div>

      <div class="all-row">
        <ng-content select="[all-row]"></ng-content>
      </div>
    </div>
  `,
  styles: `
    .descrizione-micio {
      width: 100%;
      border-radius: 1.5rem;
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.3);
    }

    .overlay {
      width: 100%;
      min-height: 20rem;
      display: flex;
      align-items: center;
      padding: 2rem;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          rgba(var(--background-rgb), 0.92) 0%,
          rgba(var(--background-rgb), 0.78) 45%,
          rgba(var(--background-rgb), 0.55) 100%
        );
      }

      .contenuto {
        position: relative;
        z-index: 1;
        max-width: 40rem;

        h1 {
          margin: 0;
          color: var(--text);
          font-size: 2.6rem;
          font-weight: 700;
          line-height: 1.1;
        }

        p {
          margin: 1rem 0 0;
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
        }
      }
    }

    .all-row {
      background: var(--background);
      padding-left: 2rem;
      padding-right: 2rem;
    }
  `,
})
export class DescrizioneMicioComponent {
  public titolo = input.required<string>();
  public descrizione = input.required<string>();
  public immagine = input<string>();
}
