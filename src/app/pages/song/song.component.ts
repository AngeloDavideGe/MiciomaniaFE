import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SongService } from './services/song.service';
import { LoadingService } from '../../shared/services/loading.service';
import { take } from 'rxjs';
import { CanzoniMiciomania } from '../../shared/interfaces/elementiUtente.interface';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MangaSongUtilities } from '../../shared/utilities/mangaSong-utilities';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [NgFor],
  templateUrl: './song.component.html',
  styles: ``,
})
export class SongComponent implements OnInit, OnDestroy {
  public mangaSongUtilities = new MangaSongUtilities();
  public ss = inject(SongService);
  public router = inject(Router);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    if (
      !this.ss.canzoniMiciomaniLoaded ||
      this.ss.canzoniMiciomani.length == 0
    ) {
      this.loadMangaMiciomani();
    }
  }

  ngOnDestroy(): void {
    this.mangaSongUtilities.stopSong();
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
}
