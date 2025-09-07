import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';
import { SquadreLang } from '../languages/interfaces/squadre-lang.interface';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-lista-squadre',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <!-- Bottone Torna alla Home -->
    <div class="mb-4">
      <app-botton-custom
        [text]="squadreLang.tornaHome"
        [icon1]="'bi bi-arrow-left'"
        [color]="'#e9ecef'"
        (clickBotton)="router.navigate(['/home'])"
      ></app-botton-custom>
    </div>

    <!-- Titolo e descrizione -->
    <div class="row mb-4">
      <div class="col-12 text-center">
        <h2 class="display-6 text-primary fw-bold mb-2">
          {{ squadreLang.andamento }}
        </h2>
        <p class="lead text-muted mb-0">
          {{ squadreLang.aggiornamento }}
        </p>
      </div>
    </div>

    <!-- Lista squadre -->
    <div class="row justify-content-center align-items-center g-2 mb-4">
      @for (squadra of team; track $index; let i = $index) {
      <div class="{{ col }} d-flex align-items-center justify-content-center">
        <!-- Badge squadra -->
        <span
          class="badge fs-6 px-3 py-2 rounded-pill shadow-sm"
          [style.backgroundColor]="colori[i]"
          [style.color]="'#fff'"
        >
          {{ squadra }}
        </span>

        <!-- VS (solo se non è l'ultima squadra) -->
        @if (i != team.length - 1) {
        <span class="fw-semibold text-secondary mx-2" style="font-size: 1rem;">
          VS
        </span>
        }
      </div>
      }
    </div>
  `,
})
export class ListaSquadreComponent {
  @Input() squadreLang!: SquadreLang;
  public router = inject(Router);
  public team: string[] = environment.team;
  public colori: string[] = environment.colori;

  // col dinamico in base al numero di squadre
  public col: string = `col-md-${Math.floor(
    12 / environment.team.length
  )} col-6`;
}
