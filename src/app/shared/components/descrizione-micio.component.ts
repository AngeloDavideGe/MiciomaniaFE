import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-descrizione-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="descrizione-micio"
      [style.background-image]="'url(' + immagine() + ')'"
    >
      <div class="overlay">
        <div class="contenuto">
          <h1>{{ titolo() }}</h1>

          <p>
            {{ descrizione() }}
          </p>
          <div class="mt-3">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .descrizione-micio {
      width: 100%;
      min-height: 20rem;
      border-radius: 1.5rem;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      border: 1px solid var(--border);
      position: relative;
      box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.3);

      .overlay {
        width: 100%;
        min-height: 20rem;
        display: flex;
        align-items: center;
        padding: 2rem;
        background: linear-gradient(
          90deg,
          rgba(var(--background-rgb), 0.92) 0%,
          rgba(var(--background-rgb), 0.78) 45%,
          rgba(var(--background-rgb), 0.55) 100%
        );

        .contenuto {
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
    }
  `,
})
export class DescrizioneMicioComponent {
  public titolo = input.required<string>();
  public descrizione = input.required<string>();
  public immagine = input<string>();
}
