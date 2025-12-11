import { Component, Input } from '@angular/core';
import {
  MangaSong,
  Proposta,
} from '../../../../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../../../../shared/utilities/mangaSong.utilities';

@Component({
  selector: 'app-canzoni-miciomania-card',
  standalone: true,
  imports: [],
  template: `
    <div
      class="card w-100 shadow-sm"
      style="
          border-radius: 12px;
          background-color: #181818;
          color: white;
          display: flex;
          flex-direction: column;
          width: 24rem !important;
        "
    >
      <img
        [src]="canzone.copertina || 'https://i.postimg.cc/NfmNs2FC/Miku.png'"
        class="card-img-top"
        alt="copertina"
        style="
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            height: 380px;
            object-fit: cover;
          "
      />
      <div class="card-body d-flex flex-column" style="flex: 1 1 auto">
        <h5
          class="card-title"
          style="
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
        >
          {{ canzone.nome }}
        </h5>
        <p class="card-text" style="font-size: 0.9rem; color: #b3b3b3">
          Genere: {{ canzone.genere }}
        </p>
      </div>
      <div
        class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center mt-auto"
      >
        <small style="color: #b3b3b3">Autore: {{ canzone.id_autore }}</small>
        <div class="d-flex gap-2">
          <button
            (click)="mangaSongUtilities.playSong(canzone)"
            class="btn btn-success btn-sm"
            style="border-radius: 20px; font-size: 0.8rem; padding: 4px 12px"
          >
            ▶ Ascolta
          </button>
          <button
            (click)="mangaSongUtilities.sc.stopSong()"
            class="btn btn-outline-light btn-sm"
            style="
                border-radius: 20px;
                font-size: 0.8rem;
                padding: 4px 12px;
                color: #ffffff;
                border-color: #ffffff;
              "
          >
            ⏹ Stop
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CanzoniMiciomaniaCardComponent {
  @Input() canzone!: MangaSong | Proposta | any;
  @Input() mangaSongUtilities!: MangaSongUtilities;
}
