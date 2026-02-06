import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-menu-profili',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div id="menuBarProfili">
      @if (user.id) {
        <li>
          <a class="dropdown-item" [routerLink]="'/posts/profilo/' + user.id">
            <i class="bi bi-person-circle me-2"></i>
            {{ homeLang.mioProfilo }}
          </a>
        </li>
      } @else {
        <li>
          <span class="dropdown-item" style="color: var(--text-muted);">
            <i class="bi bi-exclamation-circle me-2"></i>
            {{ homeLang.accediVediProfili }}
          </span>
        </li>
      }
      <li>
        <a class="dropdown-item" [routerLink]="'/posts/ultimi-post'">
          <i class="bi bi-grid-3x3-gap me-2"></i>
          {{ homeLang.visualizzaPost }}
        </a>
      </li>
      <li>
        <a class="dropdown-item" [routerLink]="'/home/admin'">
          <i class="bi bi-envelope me-2"></i>
          {{ homeLang.contattaAdmin }}
        </a>
      </li>
      @if (user.id) {
        <li>
          <a class="dropdown-item" (click)="logout.emit()">
            <i class="bi bi-box-arrow-right me-2"></i>
            Logout
          </a>
        </li>
      } @else {
        <li>
          <a class="dropdown-item" routerLink="/auth/login">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Login
          </a>
        </li>
      }
    </div>
  `,
  styles: [
    `
      #menuBarProfili {
        a {
          cursor: pointer;
          color: var(--text-color);
          transition: background-color 0.2s ease;

          &:hover {
            background-color: var(--bg-hover);
          }
        }

        span.dropdown-item {
          color: var(--text-muted);
          cursor: default;
        }

        li {
          &:not(:last-child) {
            margin-bottom: 3px;
            border-bottom: 1px solid var(--border-color);
          }
        }
      }
    `,
  ],
})
export class MenuProfiliComponent {
  @Input() homeLang!: HomeLang;
  @Input() user!: User;
  @Output() logout = new EventEmitter<void>();
}
