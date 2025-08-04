import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <!-- Pulsante per tornare indietro -->
    <app-botton-custom
      [text]="'Torna indietro'"
      [icon1]="'bi bi-arrow-left'"
      (clickBotton)="router.navigate(['/home'])"
    ></app-botton-custom>

    <!-- Header -->
    <div
      class="text-center mb-5 p-4 bg-light rounded-3 shadow"
      style="max-width: 60rem; margin: 0 auto"
    >
      <h1 class="display-5 text-primary fw-bold">Lista Admin e Utenti</h1>
      <p class="lead text-muted mb-0">
        Visualizza i ruoli e gli utenti associati in tempo reale
      </p>
    </div>
  `,
})
export class HeaderAdminComponent {
  public router = inject(Router);
}
