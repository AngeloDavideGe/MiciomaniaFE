import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CustomScrollComponent } from '../../../../../shared/components/custom/scroll-custom.component';
import { CardSongComponent } from '../../shared/card-song.component';
import { take } from 'rxjs';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { CanzoniParodia } from '../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';
import { SpinnerComponent } from '../../../../../shared/components/dialogs/spinner.component';

@Component({
  selector: 'app-canzoni-miciomania',
  imports: [CustomScrollComponent, CardSongComponent, SpinnerComponent],
  templateUrl: './canzoni-miciomania.component.html',
})
export class CanzoniMiciomaniaComponent implements OnInit {
  private euService = inject(ElementiUtenteService);
  public msu = new MangaSongUtilities();

  public canzoniParodia = computed<CanzoniParodia | null>(() =>
    this.euService.canzoniParodia(),
  );

  ngOnInit(): void {
    if (!this.euService.caricamentoCanzoni) {
      this.euService.caricamentoCanzoni = true;
      this.euService
        .getListaCanzoniMiciomani()
        .pipe(take(1))
        .subscribe({
          next: (data: CanzoniParodia) =>
            this.euService.canzoniParodia.set(data),
          error: (error) => {
            this.euService.caricamentoCanzoni = false;
            console.error('Errore nel recupero della lista dei manga', error);
          },
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
