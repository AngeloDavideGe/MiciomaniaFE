import { inject } from '@angular/core';
import { MangaMiciomaniService } from '../../pages/manga/services/mangaMiciomani.service';
import { SongService } from '../../pages/song/services/song.service';
import { AuthHandler } from '../../shared/handlers/auth.handler';

export class StorageClass {
  private authHandler = inject(AuthHandler);
  private songService = inject(SongService);
  private mangaMiciomaniService = inject(MangaMiciomaniService);

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
}
