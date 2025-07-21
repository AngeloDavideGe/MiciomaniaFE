import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-song',
  standalone: true,
  imports: [],
  template: `
    <div
      class="text-center mb-5 p-4"
      style="
      background: linear-gradient(
        135deg,
        #28a745 0%,
        #2ecc71 50%,
        #158b46 100%
      );
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(39, 174, 96, 0.5);
      color: #e6e6e6;
      max-height: 250px;
    "
    >
      <h1
        class="fw-bold mb-2"
        style="
        font-size: 2.4rem;
        letter-spacing: 1.5px;
        text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
        margin-bottom: 0.5rem;
      "
      >
        🎶 Canzoni Miciomani
      </h1>
      <p
        class="lead mx-auto"
        style="
        max-width: 680px;
        font-size: 1.1rem;
        color: #ffffff;
        text-shadow: none;
        line-height: 1.4;
        margin-bottom: 0;
      "
      >
        Immergiti nelle melodie vibranti e nelle emozioni profonde che solo i
        <strong>miciomani</strong> sanno comprendere.<br />
        Lasciati conquistare da playlist create per scaldare il cuore e farti
        ballare.
      </p>
      <button
        class="btn btn-light btn-lg mt-3"
        style="
        font-weight: 500;
        border-radius: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      "
        (click)="this.router.navigate(['/home'])"
      >
        <i class="bi bi-house-door me-2"></i>
        Torna alla home
      </button>
    </div>
  `,
  styles: [``],
})
export class HeaderSongComponent {
  public router = inject(Router);
}
