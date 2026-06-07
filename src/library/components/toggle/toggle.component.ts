import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ToggleProps } from '../../interfaces/toggle.interface';

@Component({
  selector: 'app-toggle-custom',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="home-navbar-wrapper">
      <button
        class="btn toggle-btn"
        (click)="toggleMenu()"
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
    </div>

    @if (menuOpen()) {
      <div class="dropdown-panel shadow-sm" style="top: 4rem">
        <ul class="custom-nav">
          @for (toggle of toggleMenus; track toggle.titolo) {
            <li class="nav-item dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                (click)="cambiaDropdown(toggle.titolo)"
              >
                <i class="{{ toggle.icona }} me-2"></i>
                {{ toggle.titolo }}
              </button>
            </li>

            @if (currentButton() == toggle.titolo) {
              @for (item of toggle.menuElementi; track $index) {
                @if (item.condition) {
                  <li>
                    <a (click)="item.azione()">
                      <i class="{{ item.icona }} me-2"></i>
                      {{ item.testo }}
                    </a>
                  </li>
                }
              }
            }
          }
        </ul>
      </div>
    }
  `,
  styleUrl: './toggle.component.scss',
})
export class ToggleCustomComponent {
  public currentButton = signal<string>('');

  @Input() menuOpen = signal<boolean>(false);
  @Input() toggleMenus!: ToggleProps[];

  @Output() aperturaMenu = new EventEmitter<boolean>();

  public toggleMenu(): void {
    this.menuOpen.update((x: boolean) => !x);
    this.aperturaMenu.emit(this.menuOpen());
  }

  public cambiaDropdown(drop: string): void {
    this.currentButton.update((x: string): string => (x == drop ? '' : drop));
  }
}
