import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;

  public currentTrack = signal<string | null>(null);
  public isPlaying = signal<boolean>(false);

  public playTrack(url: string) {
    this.stopTrack();

    this.audio = new Audio(url);
    this.currentTrack.set(url);
    this.isPlaying.set(true);

    this.audio.play().catch((error) => {
      console.error('Errore nella riproduzione:', error);
      this.currentTrack.set(null);
      this.isPlaying.set(false);
      this.audio = null;
    });

    this.audio.onended = () => {
      this.currentTrack.set(null);
      this.isPlaying.set(false);
      this.audio = null;
    };
  }

  public stopTrack() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }

    this.currentTrack.set(null);
    this.isPlaying.set(false);
  }
}
