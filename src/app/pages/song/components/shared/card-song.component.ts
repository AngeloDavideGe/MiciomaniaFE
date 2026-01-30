import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MangaSong } from '../../../../shared/interfaces/elementiUtente.interface';

@Component({
  selector: 'app-card-song',
  standalone: true,
  imports: [],
  template: `
    <div class="col">
      <div
        class="card h-100 shadow-sm"
        style="border-radius: 12px; background-color: #181818; color: white"
      >
        <img
          [src]="canzone.copertina"
          class="card-img-top"
          alt="copertina"
          style="
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            height: 26rem;
            object-fit: cover;
          "
        />
        <div class="card-body">
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
          class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"
        >
          <small style="color: #b3b3b3">{{ canzone.idUtente }}</small>
          <div class="d-flex gap-2">
            <button
              (click)="playSong.emit()"
              class="btn btn-success btn-sm"
              style="border-radius: 20px; font-size: 0.8rem; padding: 4px 12px"
            >
              ▶ Ascolta
            </button>
            <button
              (click)="stopSong.emit()"
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
    </div>
  `,
})
export class CardSongComponent {
  @Input() canzone!: MangaSong;
  @Output() playSong = new EventEmitter<void>();
  @Output() stopSong = new EventEmitter<void>();
}
