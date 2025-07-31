import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CanzoniMiciomania } from '../../shared/interfaces/elementiUtente.interface';
import { LoadingService } from '../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../shared/utilities/mangaSong.utilities';
import { HeaderSongComponent } from './components/header-song.component';
import { CardSongComponent } from './components/card-song.component';
import { DataHttp } from '../../core/api/http.data';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';

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
  public elementiUtenteService = inject(ElementiUtenteService);

  public canzoniMiciomani: CanzoniMiciomania[] = DataHttp.canzoniMiciomani;

  ngOnInit(): void {
    if (
      !DataHttp.canzoniMiciomaniLoaded ||
      DataHttp.canzoniMiciomani.length == 0
    ) {
      this.loadCanzoniMiciomani();
    }
  }

  private loadCanzoniMiciomani(): void {
    DataHttp.canzoniMiciomani.length == 0 ? this.loadingService.show() : null;

    this.elementiUtenteService
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
    DataHttp.canzoniMiciomani = data;
    DataHttp.canzoniMiciomaniLoaded = true;
    this.loadingService.hide();
  }
}
