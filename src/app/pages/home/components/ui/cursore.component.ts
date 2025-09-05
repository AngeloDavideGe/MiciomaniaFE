import { Component, Input } from '@angular/core';
import { CursorUtilities } from '../../../../shared/utilities/cursor.utilities';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-cursore',
  standalone: true,
  imports: [],
  template: `
    <div style="height: 1rem">
      <!-- Spazio Vuoto -->
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <!-- Riquadro per il cursore di default -->
        <div class="col-auto">
          <div class="card mb-4 shadow-sm" style="width: 8rem; margin: 0.1rem;">
            <div class="card-body text-center">
              <i
                class="bi bi-cursor"
                style="font-size: 2rem; color: #007bff;"
              ></i>
              <h5 class="card-title mt-1" style="font-size: 1rem;">Default</h5>
              <button
                class="btn btn-danger btn-sm"
                style="font-size: 0.875rem; padding: 0.25rem 0.75rem;"
                (click)="rimuoviCursore()"
              >
                {{ homeLang.rimuovi }}
              </button>
            </div>
          </div>
        </div>

        <!-- Lista dei cursori personalizzati -->
        @for (cursore of cursori; track $index) {
        <div class="col-auto">
          <div class="card mb-4 shadow-sm" style="width: 8rem; margin: 0.1rem;">
            <div class="card-body text-center">
              <i
                class="{{ 'bi bi-' + cursore.iconClass }}"
                style="font-size: 2rem; color: #007bff;"
              ></i>
              <h5 class="card-title mt-1" style="font-size: 1rem;">
                {{ cursore.nome }}
              </h5>
              <button
                class="btn btn-primary btn-sm"
                style="font-size: 0.875rem; padding: 0.25rem 0.75rem;"
                (click)="cambiaCursore(cursore.iconClass)"
              >
                {{ homeLang.seleziona }}
              </button>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class CursoreComponent {
  @Input() homeLang!: HomeLang;
  private cursorUtilities = new CursorUtilities();
  public cursori: { nome: string; iconClass: string }[] = [
    {
      nome: 'Foglia',
      iconClass: 'feather',
    },
    {
      nome: 'Penna',
      iconClass: 'pen',
    },
    {
      nome: 'Penna Vett',
      iconClass: 'vector-pen',
    },
    {
      nome: 'Contagocce',
      iconClass: 'eyedropper',
    },
    {
      nome: 'Razzo',
      iconClass: 'rocket-takeoff-fill',
    },
  ];

  private getUrlIcona(iconClass: string): string {
    return (
      'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/' +
      iconClass +
      '.svg'
    );
  }

  cambiaCursore(iconClass: string, size: number = 32) {
    this.cursorUtilities.setCursoreByIcona(this.getUrlIcona(iconClass), size);
  }

  rimuoviCursore(): void {
    this.cursorUtilities.removeCursor();
  }
}
