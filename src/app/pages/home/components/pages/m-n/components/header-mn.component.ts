import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-mn',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-5">
      <button
        class="btn btn-outline-secondary"
        style="border-radius: 20px; padding: 8px 16px"
        (click)="this.router.navigate(['/home'])"
      >
        <i class="bi bi-arrow-left me-2"></i>
        Torna alla Home
      </button>

      <h2
        class="text-center mb-0 display-5 fw-bold"
        style="font-family: 'Inter', sans-serif; color: #2c3e50; flex-grow: 1"
      >
        Classifica MN
      </h2>

      <div style="width: 120px"></div>
      <!-- Spaziatura bilanciata -->
    </div>
  `,
  styles: [``],
})
export class HeaderMNComponent {
  public router = inject(Router);
}
