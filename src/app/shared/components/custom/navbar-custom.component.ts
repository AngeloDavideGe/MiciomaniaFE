import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav class="navbar shadow-sm fixed-top px-3">
      <div
        class="container-fluid d-flex align-items-center justify-content-between px-0"
      >
        <!-- Left group: back + search -->
        <div class="d-flex align-items-center gap-3">
          @if (goHomeBotton) {
            <button class="icon-btn" (click)="router.navigate([goHomeBotton])">
              <i class="bi bi-arrow-left"></i>
            </button>
          }

          @if (filtro) {
            <button class="icon-btn" (click)="toggleSearch()">
              <i class="bi bi-search"></i>
            </button>

            <div class="search-wrapper" [class.active]="searchActive">
              <input
                type="text"
                class="search-input"
                placeholder="Cerca..."
                (input)="filtroChanged.emit($event.target.value)"
              />
            </div>
          }

          <!-- Extra Buttons -->
          @if (altriBottoni.length > 0) {
            @for (btn of altriBottoni; track $index) {
              <button
                class="icon-btn"
                (click)="btn.action()"
                [title]="btn.title"
              >
                <i [class]="btn.icon"></i>
              </button>
            }
          }
        </div>

        <!-- Nav Links -->
        <div class="d-flex align-items-center">
          @if (rouerLinks.length > 0) {
            @for (link of rouerLinks; track $index) {
              <a
                [title]="link.title"
                class="nav-link-custom mx-2"
                (click)="router.navigate([link.routing])"
              >
                {{ link.testo }}
              </a>
            }
          }
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        height: 64px;
        background: linear-gradient(to right, #ffffff, #f7f7f7);
        border-bottom: 1px solid #e6e6e6;

        .icon-btn {
          background: transparent;
          border: none;
          padding: 0.4rem;
          border-radius: 50%;
          transition: 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            font-size: 1.35rem;
            color: #333;
          }

          &:hover {
            background: #efefef;
          }
        }

        .search-wrapper {
          width: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;

          .search-input {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 20px;
            padding: 0.3rem 0.85rem;
            font-size: 0.9rem;
          }
        }

        .search-wrapper.active {
          width: 180px;
          opacity: 1;
        }

        .nav-link-custom {
          font-weight: 500;
          color: #444;
          cursor: pointer;
          transition: 0.2s;

          &:hover {
            color: #000;
          }
        }
      }
    `,
  ],
})
export class CustomNavBarComponent {
  public router = inject(Router);
  public searchActive = false;

  @Input() goHomeBotton: string | null = null;
  @Input() filtro: boolean = false;
  @Input() altriBottoni: NavBarButton[] = [];
  @Input() rouerLinks: NavBarLink[] = [];

  @Output() filtroChanged = new EventEmitter<string>();
  @Output() searchActiveFunc = new EventEmitter<boolean>();

  public toggleSearch(): void {
    this.searchActive = !this.searchActive;
    this.searchActiveFunc.emit(this.searchActive);
  }
}

export interface NavBarButton {
  icon: string;
  title: string;
  action: () => void;
}

export interface NavBarLink {
  testo: string;
  title: string;
  routing: string;
}
