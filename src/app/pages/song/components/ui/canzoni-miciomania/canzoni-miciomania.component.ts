import { Component, computed, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CardCustomComponent } from '../../../../../shared/components/custom/card-custom.component';
import { CustomScrollComponent } from '../../../../../shared/components/custom/scroll-custom.component';
import { SpinnerComponent } from '../../../../../shared/components/dialogs/spinner.component';
import { CanzoniParodia } from '../../../../../shared/interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { MangaSongUtilities } from '../../../../../shared/utilities/mangaSong.utilities';

@Component({
  selector: 'app-canzoni-miciomania',
  imports: [CustomScrollComponent, SpinnerComponent, CardCustomComponent],
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
}
