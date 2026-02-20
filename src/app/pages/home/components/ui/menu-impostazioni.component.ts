import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-menu-impostazioni',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <li>
        <a routerLink="/auth/iscrizione">
          <i class="bi bi-person-plus me-2"></i>
          {{ homeLang.iscrizioneTeam }}
        </a>
      </li>
      <li>
        <a routerLink="/home/squadre">
          <i class="bi bi-people-fill me-2"></i>
          {{ homeLang.squadre }}
        </a>
      </li>
      <li class="pc-only">
        <a (click)="cursore.emit()">
          <i class="bi bi-cursor me-2"></i>
          {{ homeLang.cursore }}
        </a>
      </li>
    </div>
  `,
  styleUrl: '../styles/toggle.styles.scss',
})
export class MenuImpostazioniComponent {
  @Input() homeLang!: HomeLang;
  @Input() user!: User;
  @Output() cursore = new EventEmitter<void>();
}
