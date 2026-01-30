import { Component, Input } from '@angular/core';
import {
  MangaSong,
  Proposta,
} from '../../../../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../../../../shared/utilities/mangaSong.utilities';

@Component({
  selector: 'app-manga-miciomania-card',
  standalone: true,
  imports: [],
  template: `
    <div
      class="card shadow-sm w-100"
      style="
          border-radius: 1rem;
          border: none;
          background: #f0f9f1;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
          transition: transform 0.3s ease;
          width: 24rem !important;
        "
    >
      <img
        [src]="manga.copertina || 'https://i.postimg.cc/SsxLcJy4/Miku.webp'"
        class="card-img-top"
        alt="Copertina Manga"
        style="
            height: 380px;
            object-fit: cover;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            border-bottom: 3px solid #27ae60;
          "
      />
      <div
        class="card-body d-flex flex-column"
        style="flex: 1 1 auto; min-height: 140px; padding: 1rem"
      >
        <div>
          <h5
            class="card-title mb-1"
            style="color: #145a32; font-size: 1.1rem; font-weight: 700"
          >
            {{ manga.nome }}
          </h5>
          <h6
            class="card-subtitle mb-2"
            style="color: #27ae60; font-size: 0.95rem; font-weight: 600"
          >
            {{ manga.genere }}
          </h6>
          <p class="card-text mb-3" style="color: #4d665d; font-size: 0.9rem">
            <span class="fw-bold">Autore:</span>
            {{ manga.idUtente }}
          </p>
        </div>
        <a
          (click)="mangaSongUtilities.downloadManga(manga)"
          target="_blank"
          class="btn btn-success w-100 mt-auto"
          style="font-weight: 600; border-radius: 30px"
        >
          <i class="bi bi-download me-2"></i>
          Scarica Manga
        </a>
      </div>
    </div>
  `,
})
export class MangaMiciomaniaCardComponent {
  @Input() manga!: MangaSong | Proposta;
  @Input() mangaSongUtilities!: MangaSongUtilities;
}
