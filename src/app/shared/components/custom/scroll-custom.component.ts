import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-scroll',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-black">
        <i class="bi bi-person-circle me-2"></i>
        {{ titolo }}
        <span class="badge bg-success ms-2">{{ lunghezzaFiltro }}</span>
      </h2>
      <div>
        <button
          class="btn btn-outline-light btn-sm text-black"
          (click)="scrollFun()"
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
