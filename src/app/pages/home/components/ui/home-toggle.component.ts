import { Component, Input, signal } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { Lingua } from '../../../../shared/interfaces/http.interface';
import { Credenziali } from '../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../languages/interfaces/home-lang.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home-toggle',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="home-navbar-wrapper">
      <button
        class="btn toggle-btn"
        (click)="menuOpen.set(!menuOpen())"
        [ngClass]="{
          'btn-primary': menuOpen(),
          'btn-outline-primary': !menuOpen(),
        }"
      >
        <i
          class="bi"
          [class.bi-list]="!menuOpen()"
          [class.bi-x]="menuOpen()"
        ></i>
      </button>

      @if (menuOpen()) {
        <div class="dropdown-panel shadow-sm">
          <ul class="custom-nav">
            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                (click)="cambiaDropdown('impostazioni')"
              >
                <i class="bi bi-gear me-2"></i>
                {{ homeLang.impostazioni }}
              </button>
              @if (currentButton() == 'impostazioni') {
                <ng-content select="[impostazioniContent]"></ng-content>
              }
            </li>

            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                (click)="cambiaDropdown('profili')"
              >
                <i class="bi bi-person me-2"></i>
                {{ homeLang.profili }}
              </button>
              @if (currentButton() == 'profili') {
                <ng-content select="[profiliContent]"></ng-content>
              }
            </li>

            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                (click)="cambiaDropdown('lingua')"
              >
                <i class="bi bi-translate me-2"></i>
                {{ homeLang.lingua }}
              </button>

              @if (currentButton() == 'lingua') {
                <ul class="language-list">
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
              }
            </li>
          </ul>
        </div>
      }
    </div>
  `,
  styleUrl: '../styles/toggle.styles.scss',
})
export class HomeToggleComponent {
  @Input() homeLang!: HomeLang;
  @Input() credenziali!: Credenziali;
  @Input() inizialiUser!: string;

  public Lingua = Lingua;
  public menuOpen = signal<boolean>(false);
  public currentButton = signal<DropdownCurrent>(null);

  public cambiaDropdown(drop: DropdownCurrent) {
    this.currentButton.update((x: DropdownCurrent) =>
      x == drop ? null : drop,
    );
  }

  public cambiaLingua(lang: Lingua): void {
    DataHttp.lingua.set(lang);
  }
}

type DropdownCurrent = 'impostazioni' | 'profili' | 'lingua' | null;
