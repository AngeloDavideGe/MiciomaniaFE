import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MangaMiciomania } from '../../../../../shared/interfaces/elementiUtente.interface';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';
import { DettagliMangaComponent } from '../../../shared/dettagli-manga.component';
import { PulsantiManga } from '../../../interfaces/filtri.interface';
import { CardMangaMiciomaniaComponent } from './components/card-mangaMiciomania.component';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { DataHttp } from '../../../../../core/api/http.data';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: [DettagliMangaComponent, CardMangaMiciomaniaComponent],
  templateUrl: './manga-miciomani.component.html',
  styles: ``,
})
export class MangaMiciomaniComponent implements OnInit {
  public elementiUtenteService = inject(ElementiUtenteService);
  public router = inject(Router);
  private loadingService = inject(LoadingService);

  public mangaSongUtilities = new MangaSongUtilities();
  public mangaMiciomani: MangaMiciomania[] = DataHttp.mangaMiciomani;
  public pulsanti: PulsantiManga[] = [
    {
      click: () => this.router.navigate(['/manga']),
      disabled: false,
      titolo: '📚 Cerca tutti i manga',
      icona: '',
    },
  ];

  ngOnInit(): void {
    if (!DataHttp.mangaMiciomaniLoaded || DataHttp.mangaMiciomani.length == 0) {
      this.loadMangaMiciomani();
    }
  }

  private loadMangaMiciomani(): void {
    DataHttp.mangaMiciomani.length == 0 ? this.loadingService.show() : null;

    this.elementiUtenteService
      .getListaMangaMiciomani()
      .pipe(take(1))
      .subscribe({
        next: (data: MangaMiciomania[]) =>
          this.nextGetListaMangaMiciomani(data),
        error: (error) =>
          console.error('Errore nel recupero della lista dei manga', error),
      });
  }

  private nextGetListaMangaMiciomani(data: MangaMiciomania[]): void {
    DataHttp.mangaMiciomani = data;
    DataHttp.mangaMiciomaniLoaded = true;
    this.loadingService.hide();
  }
}
