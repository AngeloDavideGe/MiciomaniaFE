import { Component, Input, TemplateRef } from '@angular/core';
import { Credenziali } from '../../../../shared/interfaces/users.interface';
import { NgTemplateOutlet } from '@angular/common';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';
import { DataHttp } from '../../../../core/api/http.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <section
      data-bs-version="5.1"
      class="menu menu5"
      once="menu"
      id="menu05-0"
      style="margin-top: 4rem"
    >
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container">
          <div class="navbar-brand d-flex align-items-center">
            @if(credenziali && credenziali.profilePic) {
            <div>
              <img
                [src]="credenziali.profilePic"
                alt="Profile Picture"
                style="height: 3.3rem; width: 3.3rem; border-radius: 50%"
              />
            </div>
            } @else {
            <div
              class="d-flex align-items-center justify-content-center div-profilo-pic"
            >
              {{ inizialiUser }}
            </div>
            } @if(credenziali && credenziali.nome) {
            <span class="ms-2" style="font-size: 1.2rem; font-weight: bold">
              {{ credenziali.nome }}
            </span>
            } @else {
            <span class="ms-2" style="font-size: 1.2rem; font-weight: bold">
              {{ homeLang.anonimo || 'Anonimo' }}</span
            >
            }
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto" style="gap: 1rem">
              <!-- Impostazioni Dropdown -->
              <li class="nav-item dropdown">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle stile-bottoni"
                    type="button"
                    id="settingsDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-gear"></i>
                    {{ homeLang.impostazioni || 'Impostazioni' }}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="settingsDropdown">
                    <ng-container
                      *ngTemplateOutlet="settingsMenu"
                    ></ng-container>
                  </ul>
                </div>
              </li>

              <!-- Profili Dropdown -->
              <li class="nav-item dropdown">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle stile-bottoni"
                    type="button"
                    id="profilesDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-person"></i>
                    {{ homeLang.profili || 'Profili' }}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="profilesDropdown">
                    <ng-container
                      *ngTemplateOutlet="profilesMenu"
                    ></ng-container>
                  </ul>
                </div>
              </li>

              <!-- Cambio Lingua Dropdown -->
              <li class="nav-item dropdown">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle stile-bottoni"
                    type="button"
                    id="langDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-translate"></i>
                    {{ homeLang.lingua || 'Lingua' }}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="langDropdown">
                    <li>
                      <button
                        class="dropdown-item"
                        (click)="cambiaLingua('it')"
                      >
                        🇮🇹 Italiano
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        (click)="cambiaLingua('en')"
                      >
                        🇬🇧 English
                      </button>
                    </li>
                    <!-- Aggiungi altre lingue qui -->
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  `,
  styles: [
    `
      .div-profilo-pic {
        height: 3.3rem;
        width: 3.3rem;
        border-radius: 50%;
        background-color: #5a9bf6;
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
      }

      .stile-bottoni {
        background-color: white;
        border: 1px solid #ccc;
        color: black;
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
    `,
  ],
})
export class NavBarComponent {
  @Input() homeLang!: HomeLang;
  @Input() credenziali!: Credenziali;
  @Input() inizialiUser!: string;

  @Input() settingsMenu!: TemplateRef<any>;
  @Input() profilesMenu!: TemplateRef<any>;

  public cambiaLingua(lang: string): void {
    DataHttp.lingua.set(lang);
  }
}
