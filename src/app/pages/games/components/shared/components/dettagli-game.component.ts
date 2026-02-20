import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonCustomComponent } from '../../../../../shared/components/custom/botton-custom.component';

@Component({
  selector: 'app-dettagli-game',
  standalone: true,
  imports: [ButtonCustomComponent],
  template: `
    <div
      class="container py-4 border border-primary rounded-lg p-4 shadow-lg text-center"
      style="max-width: 60rem; background-color: #f8f9fa"
    >
      <h2
        class="display-3 font-weight-bold mb-4"
        style="
    text-shadow: 1px 1px 2px var(--border-light);
    color: var(--primary-color);
  "
      >
        {{ titolo }}
      </h2>

      <div
        class="mb-4"
        style="
    border-bottom: 2px solid var(--border-color);
    width: 80%;
    margin: 0 auto 2rem auto;
  "
      ></div>

      <p
        class="lead mb-4"
        style="
    font-style: italic;
    color: var(--text-muted);
    font-size: 1.35rem;
    margin-bottom: 2rem !important;
  "
      >
        Benvenuto in questo gioco di
        <strong
          class="d-inline-block font-weight-bold"
          style="
      color: #fd7e14;
      font-size: 1.3em;
      text-shadow: 1px 1px 2px var(--border-light);
    "
          >Miciomania</strong
        >
        {{ ', ' + descrizione }}
        <br /><br />

        Hai il coraggio di sfidarci?
        <app-button-custom
          [text]="'Torna indietro'"
          [icon1]="'bi bi-arrow-left'"
          (clickBotton)="router.navigate(['/games'])"
        ></app-button-custom>
      </p>
      <ng-content select="[giocoContent]"></ng-content>
    </div>
  `,
  // styles: [``],
})
export class DettagliGameComponent {
  @Input() titolo!: string;
  @Input() descrizione!: string;

  public router = inject(Router);
}
