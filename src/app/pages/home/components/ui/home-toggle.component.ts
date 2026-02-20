import { Component, Input, signal } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { Lingua } from '../../../../shared/interfaces/http.interface';
import { Credenziali } from '../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-home-toggle',
  standalone: true,
  imports: [],
  template: `
    <div class="home-navbar-wrapper">
      <button
        class="btn stile-bottoni toggle-btn"
        (click)="menuOpen.set(!menuOpen())"
      >
        <i
          class="bi"
          [class.bi-list]="!menuOpen()"
          [class.bi-x]="menuOpen()"
        ></i>
      </button>

      @if (menuOpen()) {
        <div class="dropdown-panel">
          <ul class="custom-nav">
            <!-- Impostazioni -->
            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle stile-bottoni"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-gear"></i>
                {{ homeLang.impostazioni }}
              </button>

              <ul class="dropdown-menu dropdown-menu-end">
                <ng-content select="[impostazioniContent]"></ng-content>
              </ul>
            </li>

            <!-- Profili -->
            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle stile-bottoni"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-person"></i>
                {{ homeLang.profili }}
              </button>

              <ul class="dropdown-menu dropdown-menu-end">
                <ng-content select="[profiliContent]"></ng-content>
              </ul>
            </li>

            <!-- Lingua -->
            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle stile-bottoni"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-translate"></i>
                {{ homeLang.lingua }}
              </button>

              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    class="dropdown-item"
                    (click)="cambiaLingua(Lingua.it)"
                  >
                    🇮🇹 Italiano
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    (click)="cambiaLingua(Lingua.en)"
                  >
                    🇬🇧 English
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .home-navbar-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .toggle-btn {
          z-index: 2;
        }

        .dropdown-panel {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background-color: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;

          .custom-nav {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 0;
            padding: 0;

            .nav-item {
              list-style: none;

              .stile-bottoni {
                background-color: var(--surface-color);
                border: 1px solid var(--border-color);
                color: var(--text-color);
                padding: 0.5rem 1rem;
                font-size: 1rem;
                transition: all 0.2s ease;

                &:hover {
                  background-color: var(--bg-hover);
                  border-color: var(--border-hover);
                }
              }
            }
          }
        }
      }
    `,
  ],
})
export class HomeToggleComponent {
  @Input() homeLang!: HomeLang;
  @Input() credenziali!: Credenziali;
  @Input() inizialiUser!: string;

  public Lingua = Lingua;
  public menuOpen = signal<boolean>(false);

  public cambiaLingua(lang: Lingua): void {
    DataHttp.lingua.set(lang);
  }
}
