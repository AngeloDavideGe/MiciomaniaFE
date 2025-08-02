import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-menu-impostazioni',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div id="menuBarImpostazioni">
      <li>
        <a class="dropdown-item" routerLink="/auth/iscrizione">
          <i class="bi bi-person-plus me-2"></i>
          Iscrizione Team
        </a>
      </li>
      <li>
        <a class="dropdown-item" routerLink="/home/squadre">
          <i class="bi bi-people-fill me-2"></i>
          Squadre
        </a>
      </li>
      <li>
        <a class="dropdown-item" routerLink="/home/m&n">
          <i class="bi bi-people-fill me-2"></i>
          MN
        </a>
      </li>
      @if(user.id) {
      <li>
        <a class="dropdown-item" routerLink="/home/elementi-utente">
          <i class="bi bi-lightbulb-fill me-2"></i>
          Proposte
        </a>
      </li>
      } @else {
      <li>
        <span class="dropdown-item text-muted">
          <i class="bi bi-exclamation-circle me-2"></i>
          Accedi per vedere i tuoi elementi
        </span>
      </li>
      }

      <li class="pc-only">
        <a class="dropdown-item" (click)="cursore.emit()">
          <i class="bi bi-cursor me-2"></i>
          Cursore
        </a>
      </li>
    </div>
  `,
  styles: [
    `
      #menuBarImpostazioni {
        a {
          cursor: pointer;

          &:hover {
            background-color: #bebebe;
          }
        }

        li {
          &:not(:last-child) {
            margin-bottom: 3px;
            border-bottom: 1px solid #e0e0e0;
          }
        }
      }

      @media (max-width: 767.98px) {
        .pc-only {
          display: none;
        }
      }
    `,
  ],
})
export class MenuImpostazioniComponent {
  @Input() user!: User;
  @Output() cursore = new EventEmitter<void>();
}
