import { Component, inject } from '@angular/core';
import { MiniPlayerService } from '../../../shared/services/template/mini-player.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [],
  template: `
    <div
      class="play-container d-flex align-items-center justify-content-between border-top px-4 pt-3 pb-2"
    >
      <button
        type="button"
        class="btn-close position-absolute button-close"
        aria-label="Close"
        (click)="miniPlayerService.stopSong()"
      ></button>

      <!-- Info Canzone con effetto hover migliorato -->
      <div class="d-flex align-items-center song-info">
        <div class="image-wrapper">
          <img
            [src]="miniPlayerService.currentCanzone()?.copertina || defaultPic"
            alt="Copertina"
            class="rounded shadow-sm album-cover"
          />
          <div class="play-overlay" (click)="miniPlayerService.isPlayngFunc()">
            <span class="play-icon">{{
              miniPlayerService.isPlaying() ? '⏸️' : '▶️'
            }}</span>
          </div>
        </div>
        <div class="song-details">
          <div class="fw-semibold song-title">
            {{ miniPlayerService.currentCanzone()?.nome || 'Nessun titolo' }}
          </div>
          <div class="song-genre">
            {{
              miniPlayerService.currentCanzone()?.genere || 'Genere sconosciuto'
            }}
          </div>
        </div>
      </div>

      <!-- Controlli con design moderno -->
      <div class="d-flex align-items-center controls-wrapper">
        <button
          class="control-btn prev-btn"
          (click)="miniPlayerService.prevSong()"
          title="Precedente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button
          class="control-btn play-btn"
          (click)="miniPlayerService.isPlayngFunc()"
          title="{{ miniPlayerService.isPlaying() ? 'Pausa' : 'Play' }}"
        >
          @if (!miniPlayerService.isPlaying()) {
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          } @else {
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          }
        </button>

        <button
          class="control-btn next-btn"
          (click)="miniPlayerService.nextSong()"
          title="Successiva"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .play-container {
        height: 6rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1050;
        background: linear-gradient(
          90deg,
          var(--text-secondary) 0%,
          var(--text-muted) 100%
        );

        .button-close {
          top: 8px;
          right: 12px;
          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
          font-size: 0.7rem;

          &:hover {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      }

      .song-info {
        gap: 1rem;

        .image-wrapper {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

          .album-cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .play-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            cursor: pointer;

            .play-icon {
              font-size: 1.8rem;
              filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            }
          }

          &:hover {
            .album-cover {
              transform: scale(1.1);
            }

            .play-overlay {
              opacity: 1;
            }
          }
        }

        .song-details {
          .song-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 4px;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .song-genre {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 0.3px;
          }
        }
      }

      .controls-wrapper {
        gap: 0.5rem;

        .control-btn {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;

          svg {
            transition: transform 0.2s ease;
          }

          &:hover {
            background: rgba(255, 255, 255, 0.1);

            svg {
              transform: scale(1.1);
            }
          }

          &:active {
            transform: scale(0.95);
          }
        }

        .prev-btn,
        .next-btn {
          opacity: 0.8;

          &:hover {
            opacity: 1;
          }
        }

        .play-btn {
          background: rgba(255, 255, 255, 0.15);
          margin: 0 8px;

          &:hover {
            background: rgba(255, 255, 255, 0.25);
          }
        }
      }
    `,
  ],
})
export class MiniPlayerComponent {
  public miniPlayerService = inject(MiniPlayerService);
  public readonly defaultPic: string = environment.defaultPicsUrl.song;
}
