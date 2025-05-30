import { Component, inject } from '@angular/core';
import { SongService } from './services/song.service';
import { LoadingService } from '../../shared/services/loading.service';
import { take } from 'rxjs';
import { CanzoniMiciomania } from '../../shared/interfaces/elementiUtente.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [NgFor],
  templateUrl: './song.component.html',
  styles: ``,
})
export class SongComponent {
  public currentAudio: HTMLAudioElement | null = null;

  public ss = inject(SongService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    if (
      !this.ss.canzoniMiciomaniLoaded ||
      this.ss.canzoniMiciomani.length == 0
    ) {
      this.loadMangaMiciomani();
    }
  }

  private loadMangaMiciomani(): void {
    this.ss.canzoniMiciomani.length == 0 ? this.loadingService.show() : null;

    this.ss
      .getListaCanzoniMiciomani()
      .pipe(take(1))
      .subscribe({
        next: (data: CanzoniMiciomania[]) =>
          this.nextGetListaMangaMiciomani(data),
        error: (error) =>
          console.error('Errore nel recupero della lista dei manga', error),
      });
  }

  private nextGetListaMangaMiciomani(data: CanzoniMiciomania[]): void {
    this.ss.canzoniMiciomani = data;
    this.ss.canzoniMiciomaniLoaded = true;
    this.loadingService.hide();
    localStorage.setItem('canzoniMiciomani', JSON.stringify(data));
    sessionStorage.setItem('canzoniMiciomaniLoaded', 'true');
  }

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
}
