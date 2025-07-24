import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CanzoniMiciomania } from '../../shared/interfaces/elementiUtente.interface';
import { LoadingService } from '../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../shared/utilities/mangaSong.utilities';
import { HeaderSongComponent } from './components/header-song.component';
import { SongService } from './services/song.service';
import { CardSongComponent } from './components/card-song.component';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [HeaderSongComponent, CardSongComponent],
  templateUrl: './song.component.html',
  styles: ``,
})
export class SongComponent implements OnInit {
  public msu = new MangaSongUtilities();
  private loadingService = inject(LoadingService);
  public songService = inject(SongService);

  ngOnInit(): void {
    if (
      !this.songService.canzoniMiciomaniLoaded ||
      this.songService.canzoniMiciomani.length == 0
    ) {
      this.loadCanzoniMiciomani();
    }
  }

  private loadCanzoniMiciomani(): void {
    this.songService.canzoniMiciomani.length == 0
      ? this.loadingService.show()
      : null;

    this.songService
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
    this.songService.canzoniMiciomani = data;
    this.songService.canzoniMiciomaniLoaded = true;
    this.loadingService.hide();
  }
}
