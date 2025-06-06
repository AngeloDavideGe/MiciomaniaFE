import { inject } from '@angular/core';
import {
  CanzoniMiciomania,
  MangaMiciomania,
  Proposta,
} from '../interfaces/elementiUtente.interface';
import { MiniPlayerClass } from '../../core/class/mini-player.class';

export class MangaSongUtilities {
  private loading = false;
  public sc = inject(MiniPlayerClass);

  playSong(
    song: CanzoniMiciomania | Proposta,
    allSongs?: CanzoniMiciomania[]
  ): void {
    this.sc.stopSong();
    this.sc.currentCanzone = song;
    this.sc.allCanzoni = allSongs || ([] as CanzoniMiciomania[]);
    this.sc.playSong();
    this.sc.currentSongIndex = this.sc.allCanzoni.findIndex(
      (x: CanzoniMiciomania) => x.id_autore == song.id_autore
    );
  }

  downloadManga(manga: MangaMiciomania | Proposta): void {
    if (!this.loading) {
      this.loading = true;
      window.location.href = manga.link.slice(0, -1) + '1';
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
  }
}
