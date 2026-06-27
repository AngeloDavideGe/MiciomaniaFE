import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ToggleProps, ToggleStyles } from '../../interfaces/toggle.interface';

@Component({
  selector: 'app-toggle-custom',
  standalone: true,
  imports: [],
  template: `
    <div class="home-navbar-wrapper">
      <button
        class="btn toggle-btn"
        (click)="toggleMenu()"
        [class]="menuOpen() ? 'btn-primary' : 'btn-outline-primary'"
      >
        <i [class]="menuOpen() ? 'bi bi-x' : icona"></i>
      </button>
    </div>

    @switch (tipo) {
      @case ('single') {
        @if (menuOpen()) {
          <div class="dropdown-panel shadow-sm" [style]="toggleStyles">
            <ul class="custom-nav">
              @for (item of toggleMenus[0].menuElementi; track $index) {
                @if (item.condition) {
                  <li>
                    <a (click)="item.azione()">
                      <i class="{{ item.icona }}"></i>
                      <div [innerHTML]="item.testo"></div>
                    </a>
                  </li>
                }
              }
            </ul>
          </div>
        }
      }
      @case ('multiple') {
        @if (menuOpen()) {
          <div class="dropdown-panel shadow-sm" [style]="toggleStyles">
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
      }
    }
  `,
  styleUrl: './toggle.component.scss',
})
export class ToggleCustomComponent implements OnInit {
  public currentButton = signal<string>('');

  private readonly DEFAULT_STYLES: ToggleStyles = {
    top: '4rem',
    width: '15rem',
  };

  @Input() toggleMenus!: ToggleProps[];
  @Input() icona: string = 'bi bi-list';
  @Input() tipo: 'single' | 'multiple' = 'multiple';
  @Input() menuOpen = signal<boolean>(false);
  @Input() toggleStyles: ToggleStyles = {};

  @Output() aperturaMenu = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.toggleStyles = {
      ...this.DEFAULT_STYLES,
      ...this.toggleStyles,
    };
  }

  public toggleMenu(): void {
    this.menuOpen.update((x: boolean) => !x);
    this.aperturaMenu.emit(this.menuOpen());
  }

  public cambiaDropdown(drop: string): void {
    this.currentButton.update((x: string): string => (x == drop ? '' : drop));
  }
}
