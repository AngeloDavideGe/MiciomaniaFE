import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [NgClass],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Left group: back + search -->
        <div class="navbar-left-group">
          @if (goHomeBotton) {
            <button
              class="nav-btn back-btn"
              (click)="router.navigate([goHomeBotton])"
              aria-label="Torna indietro"
            >
              <i class="bi bi-arrow-left"></i>
              <span class="btn-label">Indietro</span>
            </button>
          }

          <ng-content select="[leftContent]"></ng-content>
        </div>

        <div class="navbar-center-group">
          <!-- Extra Buttons -->
          @if (altriBottoni.length > 0) {
            <div class="action-buttons">
              @for (btn of altriBottoni; track $index) {
                <button
                  class="nav-btn action-btn"
                  [ngClass]="{ 'selected-btn': selected() == btn.title }"
                  (click)="btn.action()"
                  [title]="btn.title"
                  aria-label="btn.title"
                >
                  <i [class]="btn.icon"></i>
                  <span class="btn-label">{{ btn.title }}</span>
                </button>
              }
            </div>
          }

          @if (filtro) {
            <div class="search-container">
              <div class="search-input-wrapper" [class.active]="searchActive">
                <i class="bi bi-search search-icon"></i>
                <input
                  type="text"
                  class="search-input"
                  placeholder="Cerca..."
                  (input)="onSearchInput($event)"
                  [value]="searchValue"
                  #searchInput
                />
                @if (searchValue && searchValue.length > 0) {
                  <button
                    class="clear-search-btn"
                    (click)="clearSearch()"
                    aria-label="Cancella ricerca"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                }
              </div>
              <button
                class="nav-btn search-toggle-btn"
                (click)="toggleSearch()"
                [class.active]="searchActive"
                aria-label="Attiva ricerca"
              >
                <i
                  class="bi"
                  [class.bi-search]="!searchActive"
                  [class.bi-x]="searchActive"
                ></i>
              </button>
            </div>
          }
        </div>

        <!-- Right group: search -->
        <div class="navbar-right-group">
          <ng-content select="[rightContent]"></ng-content>
        </div>
      </div>
    </nav>
  `,
  styleUrl: `../styles/navbar-custom.scss`,
})
export class CustomNavBarComponent {
  public router = inject(Router);
  public searchActive = false;
  public searchValue = '';

  @Input() goHomeBotton: string | null = null;
  @Input() filtro: boolean = false;
  @Input() altriBottoni: NavBarButton[] = [];
  @Input() selected = signal<string>('');

  @Output() filtroChanged = new EventEmitter<string>();
  @Output() searchActiveFunc = new EventEmitter<boolean>();

  public toggleSearch(): void {
    this.searchActive = !this.searchActive;
    this.searchActiveFunc.emit(this.searchActive);

    if (this.searchActive) {
      setTimeout(() => {
        const input = document.querySelector(
          '.search-input',
        ) as HTMLInputElement;
        input?.focus();
      }, 300);
    } else {
      this.clearSearch();
    }
  }

  public onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.filtroChanged.emit(value);
  }

  public clearSearch(): void {
    this.searchValue = '';
    this.filtroChanged.emit('');
  }
}

export interface NavBarButton {
  icon: string;
  title: string;
  action: () => void;
}
