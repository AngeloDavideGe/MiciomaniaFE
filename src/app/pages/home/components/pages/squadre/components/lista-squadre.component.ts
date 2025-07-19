import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-squadre',
  standalone: true,
  imports: [],
  template: `
    <div class="row mb-3">
      <div class="col-12">
        <button
          class="btn btn-outline-secondary d-flex align-items-center"
          style="
          margin-bottom: 15px;
          font-size: 1.1rem;
          padding: 10px 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        "
          (click)="this.router.navigate(['/home'])"
        >
          <span style="font-size: 1.5rem; margin-right: 8px">🏠</span>
          <i class="fas fa-arrow-left me-2"></i>Torna Indietro
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-12 text-center">
        <h2 class="display-6 text-primary fw-bold">Andamento Sfida</h2>
        <p class="lead text-muted">
          Miciomania vs Alcamo - Aggiornamento in tempo reale
        </p>
      </div>
    </div>

    <div class="row align-items-center mb-3">
      <div class="col-md-5 text-end">
        <span class="badge bg-danger fs-5 p-2 rounded-pill shadow">
          <i class="fas fa-users me-2"></i>Miciomania
        </span>
      </div>
      <div class="col-md-2 text-center">
        <span class="badge bg-dark fs-6 p-2">VS</span>
      </div>
      <div class="col-md-5">
        <span class="badge bg-primary fs-5 p-2 rounded-pill shadow">
          <i class="fas fa-users me-2"></i>Alcamo
        </span>
      </div>
    </div>
  `,
  styles: [``],
})
export class ListaSquadreComponent {
  public router = inject(Router);
}
