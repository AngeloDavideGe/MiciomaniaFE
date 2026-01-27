import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from './botton-custom.component';

@Component({
  selector: 'app-header-custom',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <header class="header-wrapper">
      <div class="header-content">
        <app-botton-custom
          class="back-btn"
          [text]="tornaIndietro"
          [icon1]="'bi bi-arrow-left'"
          [color]="'#f1f3f5'"
          (clickBotton)="router.navigate(['/home'])"
        ></app-botton-custom>

        <div class="title-area">
          <h1 class="title" [style]="{ color: colorTitle }">{{ titolo }}</h1>
          <p class="description">{{ descrizione }}</p>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .header-wrapper {
        max-width: 64rem;
        margin: 0 auto 2rem;
        padding: 1.5rem;
        border-radius: 1rem;
        background: #ffffff;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;

        .header-content {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1rem;
          align-items: center;
        }

        .title-area {
          text-align: center;
        }

        .title {
          color: #0d6efd;
          font-weight: 800;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          margin-bottom: 0.25rem;
          transition: color 0.3s ease;
        }

        .description {
          font-size: 1rem;
          color: #6c757d;
        }

        .header-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }

        @media (max-width: 576px) {
          .header-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .back-btn {
            justify-self: start;
          }
        }
      }
    `,
  ],
})
export class HeaderCustomComponent {
  public router = inject(Router);
  @Input() tornaIndietro: string = '';
  @Input() titolo: string = '';
  @Input() descrizione: string = '';
  @Input() colorTitle: string = '#0d6efd';
}
