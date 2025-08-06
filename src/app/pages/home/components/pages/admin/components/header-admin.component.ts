import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <div
      class="d-flex align-items-center justify-content-between mb-4"
      style="max-width: 60rem; margin: 0 auto;"
    >
      <app-botton-custom
        [text]="'Torna indietro'"
        [icon1]="'bi bi-arrow-left'"
        (clickBotton)="router.navigate(['/home'])"
      ></app-botton-custom>
      <div class="flex-grow-1 text-center">
        <h1 class="display-5 text-primary fw-bold mb-1">
          Lista Admin e Utenti
        </h1>
        <p class="lead text-muted mb-0">
          Visualizza i ruoli e gli utenti associati in tempo reale
        </p>
      </div>
      <!-- Spazio per mantenere il titolo centrato -->
      <div style="width: 160px;"></div>
    </div>
  `,
})
export class HeaderAdminComponent {
  public router = inject(Router);
}
