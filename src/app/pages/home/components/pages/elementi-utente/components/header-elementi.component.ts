import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-elementi',
  standalone: true,
  imports: [],
  template: `
    <div class="text-center mb-4">
      <h2 class="fw-bold" style="color: #2d8659">I tuoi Elementi Miciomania</h2>
      <p class="lead" style="color: #555">
        Qui puoi vedere il tuo manga, la tua canzone e la tua proposta
        inviata.<br />
        Se non hai nessuna proposta in sospeso, puoi inviarne una nuova.<br />
        Con una proposta puoi inviare il tuo manga o la tua canzone, se non ne
        hai già una associata al tuo profilo.
      </p>
      <button
        class="btn btn-primary stile-bottoni"
        (click)="this.router.navigate(['/home'])"
        onmouseover="this.style.transform='scale(1.05)';"
        onmouseout="this.style.transform='scale(1)';"
      >
        🏠 Torna alla Home
      </button>
      <hr
        style="
        width: 60px;
        border: 2px solid #2d8659;
        opacity: 1;
        margin: 1.5rem auto;
      "
      />
    </div>
  `,
  styles: [``],
})
export class HeaderElementiComponent {
  public router = inject(Router);
}
