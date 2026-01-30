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
              <i class="bi bi-chevron-left"></i>
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
                    <i class="bi bi-x"></i>
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

          <!-- Optional: User avatar or additional items -->
          <div class="user-avatar">
            <div class="avatar-placeholder">
              <i class="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        height: 70px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        backdrop-filter: blur(10px);
        border-bottom: none;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 0 24px;

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
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 16px;
          margin-left: 8px;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          padding: 8px 16px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          color: white;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          overflow: hidden;

          i {
            font-size: 1.2rem;
          }

          .btn-label {
            transition: opacity 0.2s ease;
          }

          &:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          &:active {
            transform: translateY(0);
          }

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: 0.5s;
          }

          &:hover::before {
            left: 100%;
          }
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .selected-btn {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3) inset;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-input-wrapper {
          width: 0;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          overflow: hidden;
          border-radius: 20px;

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
            color: #667eea;
            z-index: 1;
            font-size: 1.1rem;
          }

          .search-input {
            width: 100%;
            height: 44px;
            border: none;
            border-radius: 20px;
            padding: 0 20px;
            font-size: 14px;
            background: white;
            color: #333;
            box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);
            transition: all 0.3s ease;

            &:focus {
              outline: none;
              box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
            }

            &::placeholder {
              color: #a0aec0;
            }
          }

          .clear-search-btn {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;

            &:hover {
              color: #667eea;
              background: rgba(102, 126, 234, 0.1);
            }

            i {
              font-size: 1rem;
            }
          }
        }

        .search-toggle-btn {
          width: 44px;
          height: 44px;
          padding: 0;
          border-radius: 50%;

          i {
            font-size: 1.3rem;
          }

          &.active {
            background: rgba(255, 255, 255, 0.25);
          }
        }

        .user-avatar {
          .avatar-placeholder {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;

            i {
              font-size: 1.5rem;
              color: white;
            }

            &:hover {
              background: rgba(255, 255, 255, 0.25);
              border-color: rgba(255, 255, 255, 0.5);
              transform: scale(1.05);
            }
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          padding: 0 16px;

          .btn-label {
            display: none;
          }

          .nav-btn {
            padding: 8px;
            border-radius: 50%;
          }

          .search-input-wrapper.active {
            width: 200px;
          }

          .action-buttons {
            border-left: none;
            padding-left: 0;
            margin-left: 0;
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
      }, 400);
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
