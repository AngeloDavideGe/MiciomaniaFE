import { inject } from '@angular/core';
import { ProfiloHandler } from '../../pages/home/handlers/profilo.handler';
import { MangaMiciomaniService } from '../../pages/manga/services/mangaMiciomani.service';
import { SongService } from '../../pages/song/services/song.service';
import { SquadreHandler } from '../../shared/handlers/squadre.handler';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import { GitHubService } from '../../shared/services/api/github.service';
import { DataHttp } from '../api/http.data';

export class StorageClass {
  public profiloHandler = inject(ProfiloHandler);
  private squadreHandler = inject(SquadreHandler);
  private songService = inject(SongService);
  private gitHubService = inject(GitHubService);
  private mangaMiciomaniService = inject(MangaMiciomaniService);
  private elementiUtenteService = inject(ElementiUtenteService);

  public refreshLocalStorage(): void {
    localStorage.setItem(
      'canzoniMiciomani',
      JSON.stringify(this.songService.canzoniMiciomani)
    );
    localStorage.setItem('listaManga', JSON.stringify(DataHttp.listaManga));
    localStorage.setItem(
      'mangaMiciomani',
      JSON.stringify(this.mangaMiciomaniService.mangaMiciomani)
    );
    localStorage.setItem('mangaUtente', JSON.stringify(DataHttp.mangaUtente));
    localStorage.setItem('user', JSON.stringify(DataHttp.user()));
  }

  public refreshSessionStorage(): void {
    sessionStorage.setItem(
      'elementiUtente',
      JSON.stringify(this.elementiUtenteService.elementiUtente)
    );
    sessionStorage.setItem(
      'mangaCaricati',
      JSON.stringify(DataHttp.mangaScaricati)
    );
    sessionStorage.setItem('mangaAperti', JSON.stringify(DataHttp.mangaAperti));
    sessionStorage.setItem(
      'mangaMiciomaniLoaded',
      JSON.stringify(this.mangaMiciomaniService.mangaMiciomaniLoaded)
    );
    sessionStorage.setItem(
      'socialLinks',
      JSON.stringify(this.gitHubService.social)
    );
    sessionStorage.setItem(
      'punteggioOttenuto',
      JSON.stringify(this.squadreHandler.punteggioOttenuto)
    );
    sessionStorage.setItem(
      'pubblicazioni',
      JSON.stringify(this.profiloHandler.profiloPersonale)
    );
    sessionStorage.setItem('users', JSON.stringify(DataHttp.users()));
  }
}
