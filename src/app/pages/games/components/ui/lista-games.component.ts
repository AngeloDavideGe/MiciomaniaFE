import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { gamesConstant } from '../../constants/games.constant';
import { CardGioco } from '../../interfaces/games.interfaces';

@Component({
  selector: 'app-lista-games',
  standalone: true,
  imports: [],
  template: `
    <div class="row justify-content-center mt-5 g-3">
      @for (gioco of gamesConstant; track gioco.nome) {
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm border-0" style="border-radius: 12px">
          <img
            [src]="gioco.linkImg"
            class="card-img-top"
            [alt]="gioco.nome"
            style="
            height: 180px;
            object-fit: cover;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          "
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-primary mb-2" style="font-weight: 600">
              {{ gioco.nome }}
            </h5>
            <p
              class="card-text flex-grow-1"
              style="font-size: 0.9rem; color: #6c757d"
            >
              {{ gioco.descrizione }}
            </p>
            <a
              (click)="router.navigate(['games/' + gioco.routerLink])"
              class="btn btn-primary w-100 mt-3"
              style="font-size: 0.9rem; border-radius: 30px"
            >
              Gioca Ora
            </a>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class ListaGamesComponent {
  public router = inject(Router);
  public gamesConstant: CardGioco[] = gamesConstant;
}
