import { inject } from '@angular/core';
import {
  CanzoniMiciomania,
  MangaMiciomania,
  Proposta,
} from '../interfaces/elementiUtente.interface';
import { MiniPlayerService } from '../services/template/mini-player.service';

export class MangaSongUtilities {
  private loading = false;
  public sc = inject(MiniPlayerService);

  playSong(
    song: CanzoniMiciomania | Proposta,
    allSongs?: CanzoniMiciomania[]
  ): void {
    this.sc.stopSong();
    this.sc.currentCanzone.set(song);
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
