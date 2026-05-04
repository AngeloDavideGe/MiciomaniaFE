import { Component, inject, signal, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Squadre,
  Classifica,
} from '../../../../../../../../shared/interfaces/squadre.interface';
import { SquadreLang } from '../../../languages/interfaces/squadre-lang.interface';

@Component({
  selector: 'app-lista-squadre',
  standalone: true,
  imports: [],
  template: `
    <!-- Titolo e descrizione -->
    <div class="row mb-4">
      <div class="col-12 text-center">
        <h2 class="display-6 fw-bold mb-2" style="color: var(--primary-color);">
          {{ squadreLang.andamento }}
        </h2>
        <p class="lead mb-0" style="color: var(--text-secondary);">
          {{ squadreLang.aggiornamento }}
        </p>
      </div>
    </div>

    <!-- Lista squadre -->
    <div class="elemento-centrato flex-wrap mb-4">
      @for (squadra of teamSquadre(); track squadra.nome; let i = $index) {
        <div>
          <span
            class="badge fs-6 px-3 py-2 rounded-pill shadow-sm mt-2 mx-2"
            [style.backgroundColor]="squadra.colore"
          >
            {{ squadra.nome }}
          </span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      span {
        width: 11rem;
        color: var(--surface-color);
      }
    `,
  ],
})
export class ListaSquadreComponent {
  public router = inject(Router);
  public teamSquadre = signal<Squadre[]>([]);

  @Input() squadreLang!: SquadreLang;
  @Input() set classifica(value: Classifica) {
    if (value) {
      this.teamSquadre.set(value.squadre);
    }
  }
}
