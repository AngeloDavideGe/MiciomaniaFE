import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MmicioLang } from '../languages/interfaces/mmicio-lang.interface';
import { MangaSong } from '../../../../../../shared/interfaces/elementiUtente.interface';
import { environment } from '../../../../../../../environments/environment.prod';

@Component({
  selector: 'app-card-manga-miciomania',
  standalone: true,
  imports: [],
  template: `
    <div class="card card-container shadow-sm w-100">
      <img
        [src]="manga.copertina || mangaDefaultPic"
        class="card-img-top"
        alt="Copertina Manga"
      />
      <div
        class="card-body d-flex flex-column justify-content-between"
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
            <span class="fw-bold">Autore:</span> {{ manga.idUtente }}
          </p>
        </div>
        <a
          (click)="downloadManga.emit()"
          target="_blank"
          class="btn btn-success w-100"
          style="font-weight: 600; border-radius: 30px"
        >
          <i class="bi bi-download me-2"></i>
          {{ mmicioLang.scarica || 'Scarica Manga' }}
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .card-container {
        border-radius: 1rem;
        border: none;
        background: #f0f9f1;
        min-height: 520px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px rgba(39, 174, 96, 0.2);
        transition: transform 0.3s ease;
        min-width: 220px;
        max-width: 300px;

        img {
          height: 380px;
          object-fit: cover;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          border-bottom: 3px solid #27ae60;
        }
      }
    `,
  ],
})
export class CardMangaMiciomaniaComponent {
  @Input() mmicioLang!: MmicioLang;
  @Input() manga!: MangaSong;
  @Output() downloadManga = new EventEmitter<void>();

  public readonly mangaDefaultPic: string = environment.defaultPicsUrl.manga;
}
