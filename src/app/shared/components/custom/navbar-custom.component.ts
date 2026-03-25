import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataHttp } from '../../../core/api/http.data';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [NgClass],
  template: `
    <section style="padding-bottom: 4.5rem;">
      <nav class="navbar">
        <div class="navbar-container">
          <!-- Left group: back + search -->
          <div class="elemento-iniziale">
            @if (viewTornaIndietro) {
              <button
                class="nav-btn back-btn"
                (click)="router.navigate([goHomeButton().path])"
                [aria-label]="goHomeButton().title"
              >
                <i class="bi bi-arrow-left"></i>
                <span class="btn-label">{{ goHomeButton().title }}</span>
              </button>
            }

            <ng-content select="[leftContent]"></ng-content>
          </div>

          <div class="elemento-centrato">
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
                <div class="search-input-wrapper" [class.active]="true">
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
                  (click)="toggleFilters()"
                  aria-label="Apri filtri di ricerca"
                  [attr.aria-expanded]="filterActive()"
                >
                  <i class="bi bi-sliders2"></i>
                </button>
              </div>
            }
          </div>

          <!-- Right group: search -->
          <div class="elemento-finale">
            <ng-content select="[rightContent]"></ng-content>
          </div>
        </div>
      </nav>
    </section>
  `,
  styleUrl: `../styles/navbar-custom.scss`,
})
export class CustomNavBarComponent {
  public router = inject(Router);
  public filterActive = signal<boolean>(false);
  public searchValue = '';

  @Input() filtro: boolean = false;
  @Input() altriBottoni: NavBarButton[] = [];
  @Input() selected = signal<string>('');
  @Input() tornaIndietro: TornaIndietro | null = null;
  @Input() viewTornaIndietro: boolean = true;

  @Output() filtroChanged = new EventEmitter<string>();
  @Output() toggleFilter = new EventEmitter<void>();

  public goHomeButton = computed<TornaIndietro>(
    () =>
      this.tornaIndietro || {
        title: DataHttp.lingua() === 'it' ? 'Torna alla Home' : 'Go to Home',
        path: '/home',
      },
  );

  public onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.filtroChanged.emit(value);
  }

  public clearSearch(): void {
    this.searchValue = '';
    this.filtroChanged.emit('');
  }

  public toggleFilters(): void {
    this.filterActive.update((active) => !active);
    this.toggleFilter.emit();
  }
}

export interface NavBarButton {
  icon: string;
  title: string;
  action: () => void;
}

export interface TornaIndietro {
  title: string;
  path: string;
}
