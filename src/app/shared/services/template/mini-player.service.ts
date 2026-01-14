import { Injectable, signal } from '@angular/core';
import { MangaSong } from '../../interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class MiniPlayerService {
  public allCanzoni: MangaSong[] = [];
  public currentAudio: HTMLAudioElement | null = null;
  public currentSongIndex: number = 0;
  public isPlaying = signal<boolean>(true);
  public currentCanzone = signal<MangaSong | null>(null);

  nextSong(): void {
    this.stopSong();
    const numCanzoni: number = this.allCanzoni.length;

    if (numCanzoni > 1) {
      if (this.currentSongIndex < numCanzoni - 1) {
        this.currentSongIndex++;
      } else {
        this.currentSongIndex = 0;
      }

      this.newSong();
    }
  }

  prevSong(): void {
    this.stopSong();
    const numCanzoni: number = this.allCanzoni.length;

    if (numCanzoni > 1) {
      if (this.currentSongIndex > 0) {
        this.currentSongIndex--;
      } else {
        this.currentSongIndex = this.allCanzoni.length - 1;
      }

      this.newSong();
    }
  }

  private newSong(): void {
    this.currentCanzone.set(this.allCanzoni[this.currentSongIndex]);
    this.isPlaying.set(true);
    this.playSong();
  }

  playSong(): void {
    this.currentAudio = new Audio(
      this.currentCanzone()!.url.slice(0, -4) + 'raw=1'
    );
    this.currentAudio.play().catch((error) => {
      console.error('Errore nella riproduzione:', error);
    });
  }

  stopSong(): void {
    if (this.currentAudio) {
      this.currentCanzone.set(null);
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  isPlayngFunc(): void {
    this.isPlaying.set(!this.isPlaying());
    if (this.isPlaying()) {
      this.currentAudio!.play();
    } else {
      this.currentAudio!.pause();
    }
  }
}
