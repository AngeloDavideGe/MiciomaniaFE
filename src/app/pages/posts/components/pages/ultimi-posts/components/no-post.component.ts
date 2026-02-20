import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-no-post',
  imports: [],
  template: `
    <div class="no-posts text-center py-5">
      <h5 class="fw-semibold text-muted">Ancora nessun post</h5>
      <p class="text-secondary mb-0">
        Quando qualcuno pubblicherà dei post li vedrai qui 📸
      </p>
    </div>
  `,
  styles: [
    `
      .no-posts {
        background: var(--bg-light);
        border: 2px dashed var(--border-color);
        border-radius: 16px;
        padding: 2rem;
        max-width: 30rem;
        margin: 2rem auto;
        transition: background 0.3s;

        &:hover {
          background: var(--surface-color);
        }

        i {
          opacity: 0.6;
        }

        h5 {
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.9rem;
        }
      }
    `,
  ],
})
export class NoPostComponent {}
