import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-menu-profili',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <div id="menuBarProfili">
      <ng-container *ngIf="user.id; else NoProfiloPersonale">
        <li>
          <a class="dropdown-item" [routerLink]="'/home/profilo/' + user.id">
            <i class="bi bi-person-circle me-2"></i>
            Il mio profilo
          </a>
        </li>
      </ng-container>
      <ng-template #NoProfiloPersonale>
        <li>
          <span class="dropdown-item text-muted">
            <i class="bi bi-exclamation-circle me-2"></i>
            Accedi per vedere il tuo Profilo
          </span>
        </li>
      </ng-template>
      <li>
        <a class="dropdown-item" (click)="cercaProfili.emit()">
          <i class="bi bi-search me-2"></i>
          Cerca profili
        </a>
      </li>
      <li>
        <a class="dropdown-item" [routerLink]="'/home/admin'">
          <i class="bi bi-envelope me-2"></i>
          Contatta Admin
        </a>
      </li>
      <ng-container *ngIf="user.id; else loggedOut">
        <li>
          <a class="dropdown-item" (click)="logout.emit()">
            <i class="bi bi-box-arrow-right me-2"></i>
            Logout
          </a>
        </li>
      </ng-container>
      <ng-template #loggedOut>
        <li>
          <a class="dropdown-item" routerLink="/login">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Login
          </a>
        </li>
      </ng-template>
    </div>
  `,
  styles: [
    `
      #menuBarProfili {
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
export class MenuProfiliComponent {
  @Input() user!: User;
  @Output() logout = new EventEmitter<void>();
  @Output() cercaProfili = new EventEmitter<void>();
}
