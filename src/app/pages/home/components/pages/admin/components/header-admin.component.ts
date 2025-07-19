import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  template: `
    <!-- Pulsante per tornare indietro -->
    <div class="mb-3">
      <button
        class="btn btn-secondary"
        style="display: inline-flex; align-items: center; gap: 0.5rem"
        (click)="router.navigate(['home'])"
      >
        <i class="bi bi-arrow-left"></i> Indietro
      </button>
    </div>

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
  styles: [``],
})
export class HeaderAdminComponent {
  public router = inject(Router);
}
