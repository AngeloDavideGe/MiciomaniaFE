import { Component, inject, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { CanzoniParodia } from '../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import { LoadingService } from '../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../shared/utilities/mangaSong.utilities';
import { song_imports } from './imports/song.import';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: song_imports,
  templateUrl: './song.component.html',
})
export class SongComponent implements OnInit {
  public msu = new MangaSongUtilities();
  private loadingService = inject(LoadingService);
  public elementiUtenteService = inject(ElementiUtenteService);

  ngOnInit(): void {
    if (!this.elementiUtenteService.canzoniParodia) {
      this.loadingService.show();

      this.elementiUtenteService
        .getListaCanzoniMiciomani()
        .pipe(
          take(1),
          finalize(() => this.loadingService.hide()),
        )
        .subscribe({
          next: (data: CanzoniParodia) =>
            (this.elementiUtenteService.canzoniParodia = data),
          error: (error) =>
            console.error('Errore nel recupero della lista dei manga', error),
        });
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
