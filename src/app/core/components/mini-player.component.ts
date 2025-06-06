import { Component, Input } from '@angular/core';
import { MiniPlayerClass } from '../class/mini-player.class';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [],
  template: `
    <div
      class="d-flex align-items-center justify-content-between border-top bg-dark text-white px-4 pt-3 pb-2"
      style="height: 8rem; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1050;"
    >
      <button
        type="button"
        class="btn-close btn-close-white position-absolute"
        aria-label="Close"
        style="top: 10px; right: 14px;"
        (click)="miniPlayerClass.stopSong()"
      ></button>
      <!-- Info Canzone -->
      <div class="d-flex align-items-center">
        <img
          [src]="
            miniPlayerClass.currentCanzone?.copertina ||
            'https://i.postimg.cc/NfmNs2FC/Miku.png'
          "
          alt="Copertina"
          class="rounded shadow-sm"
          style="width: 64px; height: 64px; object-fit: cover; margin-right: 15px;"
        />
        <div>
          <div class="fw-semibold" style="font-size: 1.1rem;">
            {{ miniPlayerClass.currentCanzone?.nome || 'Nessun titolo' }}
          </div>
          <div class="text-white-50" style="font-size: 0.85rem;">
            {{ miniPlayerClass.currentCanzone?.genere || 'Genere sconosciuto' }}
          </div>
        </div>
      </div>

      <!-- Controlli -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-link text-white p-1 mx-2"
          style="font-size: 1.5rem;"
          (click)="miniPlayerClass.prevSong()"
        >
          ⏮️
        </button>
        <button
          class="btn btn-link text-white p-1 mx-2"
          style="font-size: 2rem;"
          (click)="miniPlayerClass.isPlayngFunc()"
        >
          {{ miniPlayerClass.isPlaying ? '⏸️' : '▶️' }}
        </button>
        <button
          class="btn btn-link text-white p-1 mx-2"
          style="font-size: 1.5rem;"
          (click)="miniPlayerClass.nextSong()"
        >
          ⏭️
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class MiniPlayerComponent {
  @Input() miniPlayerClass!: MiniPlayerClass;
}
