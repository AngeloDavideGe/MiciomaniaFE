import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MangaMiciomania } from '../../../../../shared/interfaces/elementiUtente.interface';
import { LoadingService } from '../../../../../shared/services/loading.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';
import { MangaMiciomaniService } from '../../../services/mangaMiciomani.service';
import { DettagliMangaComponent } from '../../../shared/dettagli-manga.component';
import { PulsantiManga } from '../../../interfaces/filtri.interface';
import { CardMangaMiciomaniaComponent } from './components/card-mangaMiciomania.component';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: [DettagliMangaComponent, CardMangaMiciomaniaComponent],
  templateUrl: './manga-miciomani.component.html',
  styles: ``,
})
export class MangaMiciomaniComponent implements OnInit {
  public mms = inject(MangaMiciomaniService);
  public router = inject(Router);
  private loadingService = inject(LoadingService);
  public mangaSongUtilities = new MangaSongUtilities();
  public pulsanti: PulsantiManga[] = [
    {
      click: () => this.router.navigate(['/manga']),
      disabled: false,
      titolo: '📚 Cerca tutti i manga',
      icona: '',
    },
  ];

  ngOnInit(): void {
    if (!this.mms.mangaMiciomaniLoaded || this.mms.mangaMiciomani.length == 0) {
      this.loadMangaMiciomani();
    }
  }

  private loadMangaMiciomani(): void {
    this.mms.mangaMiciomani.length == 0 ? this.loadingService.show() : null;

    this.mms
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
    this.mms.mangaMiciomani = data;
    this.mms.mangaMiciomaniLoaded = true;
    this.loadingService.hide();
  }
}
