import { inject } from '@angular/core';
import { MangaMiciomaniService } from '../../pages/manga/services/mangaMiciomani.service';
import { SongService } from '../../pages/song/services/song.service';
import { AuthHandler } from '../../shared/handlers/auth.handler';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import { HomeService } from '../../pages/home/services/home.service';
import { SquadreHandler } from '../../shared/handlers/squadre.handler';
import { MangaHandler } from '../../pages/manga/handlers/manga.handler';
import { ProfiloHandler } from '../../pages/home/handlers/profilo.handler';

export class StorageClass {
  private authHandler = inject(AuthHandler);
  public profiloHandler = inject(ProfiloHandler);
  private mangaHandler = inject(MangaHandler);
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
      JSON.stringify(this.mangaHandler.listaManga)
    );
    localStorage.setItem(
      'mangaMiciomani',
      JSON.stringify(this.mangaMiciomaniService.mangaMiciomani)
    );
    localStorage.setItem(
      'mangaUtente',
      JSON.stringify(this.mangaHandler.mangaUtente)
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
      JSON.stringify(this.mangaHandler.mangaScaricati)
    );
    sessionStorage.setItem(
      'mangaAperti',
      JSON.stringify(this.mangaHandler.mangaAperti)
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
    sessionStorage.setItem(
      'pubblicazioni',
      JSON.stringify(this.profiloHandler.profiloPersonale)
    );
    sessionStorage.setItem('users', JSON.stringify(this.authHandler.users()));
  }
}
