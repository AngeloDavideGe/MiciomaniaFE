import { inject } from '@angular/core';
import { MangaMiciomaniService } from '../../pages/manga/services/mangaMiciomani.service';
import { SongService } from '../../pages/song/services/song.service';
import { AuthHandler } from '../../shared/handlers/auth.handler';
import { ElementiUtenteService } from '../../shared/services/elementiUtente.service';
import { HomeService } from '../../pages/home/services/home.service';
import { SquadreHandler } from '../../shared/handlers/squadre.handler';

export class StorageClass {
  private authHandler = inject(AuthHandler);
  private squadreHandler = inject(SquadreHandler);
  private songService = inject(SongService);
  private homeService = inject(HomeService);
  private mangaMiciomaniService = inject(MangaMiciomaniService);
  private elementiUtenteService = inject(ElementiUtenteService);

  public refreshLocalStorage(): void {
    localStorage.setItem(
      'canzoniMiciomani',
      JSON.stringify(this.songService.canzoniMiciomani)
    );
    localStorage.setItem(
      'listaManga',
      JSON.stringify(this.authHandler.mangaHandler.listaManga)
    );
    localStorage.setItem(
      'mangaMiciomani',
      JSON.stringify(this.mangaMiciomaniService.mangaMiciomani)
    );
    localStorage.setItem(
      'mangaUtente',
      JSON.stringify(this.authHandler.mangaHandler.mangaUtente)
    );
    localStorage.setItem('user', JSON.stringify(this.authHandler.user()));
  }

  public refreshSessionStorage(): void {
    sessionStorage.setItem(
      'elementiUtente',
      JSON.stringify(this.elementiUtenteService.elementiUtente)
    );
    sessionStorage.setItem(
      'mangaCaricati',
      JSON.stringify(this.authHandler.mangaHandler.mangaScaricati)
    );
    sessionStorage.setItem(
      'mangaMiciomaniLoaded',
      JSON.stringify(this.mangaMiciomaniService.mangaMiciomaniLoaded)
    );
    sessionStorage.setItem(
      'socialLinks',
      JSON.stringify(this.homeService.social)
    );
    sessionStorage.setItem(
      'punteggioOttenuto',
      JSON.stringify(this.squadreHandler.punteggioOttenuto)
    );
    sessionStorage.setItem('users', JSON.stringify(this.authHandler.users()));
  }
}
