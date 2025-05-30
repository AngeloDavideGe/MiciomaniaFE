import {
  CanzoniMiciomania,
  MangaMiciomania,
} from '../interfaces/elementiUtente.interface';

export class MangaSongUtilities {
  private currentAudio: HTMLAudioElement | null = null;
  private loading = false;

  playSong(song: CanzoniMiciomania): void {
    this.stopSong();

    this.currentAudio = new Audio(song.link.slice(0, -4) + 'raw=1');
    this.currentAudio.play().catch((error) => {
      console.error('Errore nella riproduzione:', error);
    });
  }

  stopSong(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  downloadManga(manga: MangaMiciomania): void {
    if (!this.loading) {
      this.loading = true;
      window.location.href = manga.link.slice(0, -1) + '1';
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    }
  }
}
