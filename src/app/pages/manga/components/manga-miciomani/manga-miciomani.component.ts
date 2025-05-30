import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MangaMiciomania } from '../../../../shared/interfaces/elementiUtente.interface';
import { LoadingService } from '../../../../shared/services/loading.service';
import { MangaMiciomaniService } from '../../services/mangaMiciomani.service';

@Component({
  selector: 'app-manga-miciomani',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manga-miciomani.component.html',
  styles: ``,
})
export class MangaMiciomaniComponent implements OnInit {
  public mms = inject(MangaMiciomaniService);
  private loadingService = inject(LoadingService);

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
    localStorage.setItem('mangaMiciomani', JSON.stringify(data));
    sessionStorage.setItem('mangaMiciomaniLoaded', 'true');
  }

  downloadManga(manga: MangaMiciomania): void {
    console.log('Download manga:', manga.link);
    window.open(
      'https://www.dropbox.com/scl/fi/pvlpi5s6di114218sl4s5/Indykun.pdf?rlkey=6yp11sywtemmwpo4wh4esouaf&st=hkzq3t9w&dl=1'
    );
  }
}
