import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-posts-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm"
    >
      <div class="container d-flex align-items-center justify-content-between">
        <!-- Icona di ricerca + input -->
        <div class="d-flex align-items-center search-wrapper">
          <button class="btn btn-link p-0 me-2" (click)="toggleSearch()">
            <i class="bi bi-search fs-4"></i>
          </button>
          <input
            type="text"
            class="form-control search-input"
            placeholder="Cerca"
            [class.active]="searchActive"
            (input)="filtroChanged.emit($event.target.value)"
          />
        </div>

        <!-- Menu o icone destra (es. profilo) -->
        <div class="d-flex align-items-center">
          <button class="btn btn-link">
            <i class="bi bi-person-circle fs-4"></i>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        height: 60px;
        background-color: #fff !important;
      }

      .search-wrapper {
        position: relative;
      }

      .search-input {
        width: 0;
        opacity: 0;
        transition: all 0.3s ease;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 0.25rem 1rem;
      }

      .search-input.active {
        width: 180px;
        opacity: 1;
      }

      .btn-link {
        color: #000;
      }
    `,
  ],
})
export class PostsNavBarComponent {
  public searchActive = false;
  @Output() filtroChanged = new EventEmitter<string>();
  @Output() searchActiveFunc = new EventEmitter<boolean>();

  public toggleSearch(): void {
    this.searchActive = !this.searchActive;
    this.searchActiveFunc.emit(this.searchActive);
  }
}
