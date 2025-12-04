import { Component } from '@angular/core';

@Component({
  selector: 'app-math-header',
  standalone: true,
  imports: [],
  template: `
    <header class="math-header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">
            <i class="fas fa-calculator me-2"></i>
            Miciomania - Math
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Operazioni</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
        </div> -->
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .math-header {
        .navbar-brand {
          font-weight: 700;
          font-size: 1.5rem;

          i {
            color: #ffd700;
          }
        }
      }
    `,
  ],
})
export class MathHeaderComponent {}
