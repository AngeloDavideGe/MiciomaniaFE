import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CanzoniParodia } from '../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import { LoadingService } from '../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../shared/utilities/mangaSong.utilities';
import { CardSongComponent } from './components/card-song.component';
import { HeaderSongComponent } from './components/header-song.component';
import { CustomScrollComponent } from '../../shared/components/custom/scroll-custom.component';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [HeaderSongComponent, CardSongComponent, CustomScrollComponent],
  templateUrl: './song.component.html',
})
export class SongComponent implements OnInit {
  public msu = new MangaSongUtilities();
  private loadingService = inject(LoadingService);
  public elementiUtenteService = inject(ElementiUtenteService);

  ngOnInit(): void {
    if (!this.elementiUtenteService.canzoniParodia) {
      this.loadCanzoniMiciomani();
    }
  }

  private loadCanzoniMiciomani(): void {
    this.loadingService.show();

    this.elementiUtenteService
      .getListaCanzoniMiciomani()
      .pipe(take(1))
      .subscribe({
        next: (data: CanzoniParodia) => this.nextGetListaMangaMiciomani(data),
        error: (error) =>
          console.error('Errore nel recupero della lista dei manga', error),
      });
  }

  private nextGetListaMangaMiciomani(data: CanzoniParodia): void {
    this.elementiUtenteService.canzoniParodia = data;
    this.loadingService.hide();
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
