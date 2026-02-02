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
        </div>

        <!-- Right group: search -->
        <div class="navbar-right-group">
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
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        height: 72px;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 0 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .navbar-left-group,
        .navbar-right-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          padding-left: 16px;
          margin-left: 8px;
          border-left: 1px solid rgba(0, 0, 0, 0.06);
        }

        .nav-btn {
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 10px 18px;
          border-radius: 10px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          color: #334155;
          font-size: 14px;
          font-weight: 500;
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

          i {
            font-size: 1.1rem;
            color: #64748b;
          }

          .btn-label {
            transition: opacity 0.2s ease;
          }

          &:hover {
            background: rgba(0, 0, 0, 0.02);
            border-color: rgba(0, 0, 0, 0.12);
            transform: translateY(-1px);
          }

          &:active {
            transform: translateY(0);
            background: rgba(0, 0, 0, 0.04);
          }
        }

        .back-btn {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #475569;

          i {
            color: #64748b;
          }

          &:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
          }
        }

        .selected-btn {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;

          i {
            color: white;
          }

          &:hover {
            background: #2563eb;
            border-color: #2563eb;
          }
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-input-wrapper {
          width: 0;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;

          &.active {
            width: 280px;
            opacity: 1;

            .search-input {
              padding-left: 44px;
            }
          }

          .search-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            z-index: 1;
            font-size: 1rem;
          }

          .search-input {
            width: 100%;
            height: 44px;
            border: none;
            background: transparent;
            padding: 0 20px;
            font-size: 14px;
            color: #334155;
            outline: none;

            &::placeholder {
              color: #94a3b8;
            }

            &:focus {
              background: #ffffff;
            }
          }

          .clear-search-btn {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;

            &:hover {
              color: #64748b;
              background: rgba(0, 0, 0, 0.04);
            }

            i {
              font-size: 0.9rem;
            }
          }
        }

        .search-toggle-btn {
          width: 44px;
          height: 44px;
          padding: 0;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;

          i {
            font-size: 1.2rem;
            color: #64748b;
          }

          &:hover {
            background: #f1f5f9;
          }

          &.active {
            background: #3b82f6;
            border-color: #3b82f6;

            i {
              color: white;
            }

            &:hover {
              background: #2563eb;
            }
          }
        }

        /* Micro animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar {
          animation: fadeIn 0.3s ease-out;
        }

        /* Responsive */
        @media (max-width: 768px) {
          padding: 0 16px;
          height: 64px;

          .btn-label {
            display: none;
          }

          .nav-btn {
            padding: 10px;
            border-radius: 8px;
            min-width: 44px;
            min-height: 44px;
          }

          .search-input-wrapper.active {
            width: 200px;
          }

          .action-buttons {
            border-left: none;
            padding-left: 0;
            margin-left: 0;
            gap: 4px;
          }
        }

        @media (max-width: 480px) {
          .search-input-wrapper.active {
            width: 160px;
          }

          .navbar-left-group,
          .navbar-right-group {
            gap: 8px;
          }
        }

        @media (max-width: 360px) {
          padding: 0 12px;

          .search-input-wrapper.active {
            width: 140px;
          }
        }
      }
    `,
  ],
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
