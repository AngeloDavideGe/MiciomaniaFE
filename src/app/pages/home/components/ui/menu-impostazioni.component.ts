import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-menu-impostazioni',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div id="menuBarImpostazioni">
      <li>
        <a class="dropdown-item" routerLink="/auth/iscrizione">
          <i class="bi bi-person-plus me-2"></i>
          {{ homeLang.iscrizioneTeam }}
        </a>
      </li>
      <li>
        <a class="dropdown-item" routerLink="/home/squadre">
          <i class="bi bi-people-fill me-2"></i>
          {{ homeLang.squadre }}
        </a>
      </li>
      <li class="pc-only">
        <a class="dropdown-item" (click)="cursore.emit()">
          <i class="bi bi-cursor me-2"></i>
          {{ homeLang.cursore }}
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
            background-color: var(--bg-background-color);
          }
        }

        li {
          &:not(:last-child) {
            border-bottom: 1px solid var(--bg-background-color);
          }
        }
      }
    `,
  ],
})
export class MenuImpostazioniComponent {
  @Input() homeLang!: HomeLang;
  @Input() user!: User;
  @Output() cursore = new EventEmitter<void>();
}
