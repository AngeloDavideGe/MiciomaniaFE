import { inject } from '@angular/core';
import { MangaSong, Proposta } from '../interfaces/elementiUtente.interface';
import { MiniPlayerService } from '../services/template/mini-player.service';

export class MangaSongUtilities {
  private loading = false;
  public sc = inject(MiniPlayerService);

  playSong(song: MangaSong | Proposta, allSongs?: MangaSong[]): void {
    this.sc.stopSong();
    this.sc.currentCanzone.set(song);
    this.sc.allCanzoni = allSongs || ([] as MangaSong[]);
    this.sc.playSong();
    this.sc.isPlaying.set(true);
    this.sc.currentSongIndex = this.sc.allCanzoni.findIndex(
      (x: MangaSong) => x.idUtente == song.idUtente,
    );
  }

  downloadManga(manga: MangaSong | Proposta): void {
    if (!this.loading) {
      this.loading = true;
      window.location.href = manga.url.slice(0, -1) + '1';
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
  }
}
