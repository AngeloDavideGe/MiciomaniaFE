import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize, take } from 'rxjs';
import { CanzoniParodia } from '../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import { LoadingService } from '../../shared/services/template/loading.service';
import { MangaSongUtilities } from '../../shared/utilities/mangaSong.utilities';
import { song_imports } from './imports/song.import';
import { NavBarButton } from '../../shared/components/custom/navbar-custom.component';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: song_imports,
  templateUrl: './song.component.html',
})
export class SongComponent implements OnInit {
  private loadingService = inject(LoadingService);
  public elementiUtenteService = inject(ElementiUtenteService);

  public msu = new MangaSongUtilities();
  public navbarButtons: NavBarButton[] = this.getPulsanti();
  public componente = signal<'song' | 'proposta'>('song');

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

  private getPulsanti(): NavBarButton[] {
    return [
      {
        icon: 'bi bi-music-note-beamed',
        title: 'Canzoni Miciomania',
        action: () => this.componente.set('song'),
      },
      {
        icon: 'bi bi-plus-circle',
        title: 'Proponi una canzone',
        action: () => this.componente.set('proposta'),
      },
    ];
  }
}
