import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-scroll',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 style="color: var(--text-color);">
        <i class="bi bi-person-circle me-2"></i>
        {{ titolo }}
        <span
          class="badge ms-2"
          style="background-color: #198754; color: white;"
          >{{ lunghezzaFiltro }}</span
        >
      </h2>
      <div>
        <button
          class="btn btn-sm"
          (click)="scrollFun()"
          style="
        border: 1px solid var(--border-color);
        color: var(--text-color);
        background-color: var(--surface-color);
      "
        >
          <i class="me-1" [class]="icona"></i>
          {{ nomeIcona }}
        </button>
      </div>
    </div>
  `,
})
export class CustomScrollComponent {
  @Input() titolo: string = '';
  @Input() icona: string = '';
  @Input() nomeIcona: string = '';
  @Input() top: number = 0;
  @Input() lunghezzaFiltro: number = 0;
  @Input() idComponent: string | null = null;

  scrollFun() {
    if (this.idComponent) {
      const element: HTMLElement | null = document.getElementById(
        this.idComponent,
      );
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      window.scrollTo({
        top: this.top,
        behavior: 'smooth',
      });
    }
  }
}
