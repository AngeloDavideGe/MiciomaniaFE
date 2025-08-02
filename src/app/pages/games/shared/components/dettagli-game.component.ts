import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from '../../../../shared/components/custom/botton-custom.component';

@Component({
  selector: 'app-dettagli-game',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <h2
      class="display-3 font-weight-bold text-primary mb-4"
      style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1)"
    >
      {{ titolo }}
    </h2>

    <div
      class="mb-4"
      style="
      border-bottom: 2px solid #dee2e6;
      width: 80%;
      margin: 0 auto 2rem auto;
    "
    ></div>

    <p
      class="lead mb-4"
      style="
      font-style: italic;
      color: #6c757d;
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
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      "
        >Miciomania</strong
      >
      {{ ', ' + descrizione }}
      <br /><br />

      Hai il coraggio di sfidarci?
      <app-botton-custom
        [text]="'Torna indietro'"
        [icon]="'bi bi-arrow-left'"
        (clickBotton)="router.navigate(['/games'])"
      ></app-botton-custom>
    </p>
  `,
  // styles: [``],
})
export class DettagliGameComponent {
  @Input() titolo!: string;
  @Input() descrizione!: string;

  public router = inject(Router);
}
