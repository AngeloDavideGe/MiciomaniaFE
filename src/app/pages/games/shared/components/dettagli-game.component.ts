import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettagli-game',
  standalone: true,
  imports: [],
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
      <button
        class="btn btn-outline-danger font-weight-bold py-2 px-4"
        style="font-size: 1.1rem; transition: all 0.3s"
        (click)="this.router.navigate(['/games'])"
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        No - Torna Indietro
      </button>
    </p>
  `,
  // styles: [``],
})
export class DettagliGameComponent {
  @Input() titolo!: string;
  @Input() descrizione!: string;

  public router = inject(Router);
}
