import { Component, computed, inject, Input, signal } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { User } from '../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';
import { setUserDataNull } from '../../../../core/functions/storage.function';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-active',
  standalone: true,
  imports: [],
  template: `
    <div class="elemento-iniziale" style="--align-start: center">
      @if (user.credenziali.profilePic) {
        <img
          [src]="user.credenziali.profilePic"
          alt="Profile Picture"
          class="rounded-circle"
          style="width: 3.4rem; height: 3.4rem; cursor: pointer"
          (click)="openProfili()"
        />
      } @else {
        <div
          class="bg-secondary text-white rounded-circle"
          style="width: 3.4rem; height: 3.4rem; font-weight: bold; cursor: pointer"
          (click)="openProfili()"
        >
          <span class="elemento-centrato" style="margin-top: 0.9rem;">
            {{ inizialiUser }}
          </span>
        </div>
      }

      <span class="ms-2 fw-bold" style="font-size: 1.2rem">
        @if (user.credenziali.nome) {
          {{ user.credenziali.nome }}
        } @else {
          {{ homeLang.anonimo }}
        }
      </span>
    </div>

    @if (profiliOpen()) {
      <div class="dropdown-panel shadow-sm mt-3" style="left: 0; top: 3rem">
        <div class="profiles-list">
          @for (userFor of allProfili(); track userFor.id) {
            <div
              class="profile-item elementi-laterali"
              (click)="cambiaProfilo(userFor)"
            >
              <div class="profile-avatar">
                @if (userFor.credenziali.profilePic) {
                  <img
                    [src]="userFor.credenziali.profilePic"
                    alt="Profile Picture"
                    class="rounded-circle"
                  />
                } @else {
                  <div class="avatar-placeholder elemento-centrato">
                    <span style="margin-top: 0.5rem">{{
                      userFor.id.slice(0, 2).toUpperCase()
                    }}</span>
                  </div>
                }
              </div>

              <div class="profile-info">
                <div class="profile-username">{{ userFor.id }}</div>
                <div class="profile-name">{{ userFor.credenziali.nome }}</div>
              </div>

              @if (user.id == userFor.id) {
                <div class="profile-check">
                  <i class="bi bi-check-circle-fill"></i>
                </div>
              }
            </div>
          }
        </div>

        <div class="dropdown-divider"></div>

        <div
          class="add-account-item"
          (click)="router.navigate(['/auth/new-login'])"
        >
          <div class="add-account-icon">
            <i class="bi bi-plus-circle-fill"></i>
          </div>
          <div class="add-account-text">
            <span>Aggiungi account</span>
          </div>
        </div>

        <div class="logout-item" (click)="logoutAll()">
          <div class="logout-text">
            <span>Esci da tutti gli account</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .dropdown-panel {
        position: absolute;
        top: 100%;
        right: 0;
        width: 280px;
        background: var(--surface-color);
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        z-index: 1000;

        .profiles-list {
          max-height: 320px;
          overflow-y: auto;
        }

        .profile-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s;

          &:hover {
            background-color: var(--bg-hover);
          }
        }

        .profile-avatar {
          width: 44px;
          height: 44px;
          margin-right: 12px;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background-color: var(--bg-lighter);
          border-radius: 50%;
          font-weight: bold;
          font-size: 16px;
          color: var(--text-secondary);
        }

        .profile-info {
          flex: 1;
        }

        .profile-username {
          font-weight: 600;
          font-size: 14px;
          color: var(--text-color);
          margin-bottom: 2px;
        }

        .profile-name {
          font-size: 12px;
          color: var(--text-muted);
        }

        .profile-check {
          color: var(--primary-color);
          font-size: 18px;

          i {
            display: flex;
            align-items: center;
          }
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--border-light);
          margin: 8px 0;
        }

        .add-account-item {
          display: flex;
          align-items: center;
          padding: 0px 16px;
          cursor: pointer;
          transition: background-color 0.2s;

          &:hover {
            background-color: var(--bg-hover);
          }
        }

        .add-account-icon {
          width: 44px;
          height: 44px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          i {
            font-size: 28px;
            color: var(--primary-color);
          }
        }

        .add-account-text {
          flex: 1;
          font-weight: 500;
          font-size: 14px;
          color: var(--primary-color);
        }

        .logout-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          border-top: 1px solid var(--border-light);

          &:hover {
            background-color: var(--bg-hover);
          }
        }

        .logout-text {
          font-size: 14px;
          color: var(--red-miciomania);
          text-align: center;
          font-weight: 500;
        }
      }
    `,
  ],
})
export class UserActiveComponent {
  @Input() homeLang!: HomeLang;
  @Input() user!: User;
  @Input() inizialiUser!: string;

  private authService = inject(AuthService);
  public router = inject(Router);

  public profiliOpen = signal<boolean>(false);
  public allProfili = computed<User[]>(() => {
    this.authService.users();
    return DataHttp.allUsers;
  });

  public openProfili(): void {
    if (this.user.id) {
      this.profiliOpen.update((x: boolean) => !x);
    }
  }

  public cambiaProfilo(user: User): void {
    if (user.id != this.user.id) {
      setUserDataNull(user, this.authService, 'change-user');
    }
  }

  public logoutAll(): void {
    setUserDataNull({} as User, this.authService, 'logout-all');
    this.profiliOpen.set(false);
  }
}
