import { Component, inject, Input } from '@angular/core';
import { AppConfigService } from '../../../../../../../core/api/appConfig.service';
import { CardIndyComponent } from '../../../../../../../../library/components/card/card-indy.component';
import {
  MangaSong,
  UtenteParodie,
} from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../../../shared/utilities/class/mangaSong.utilities';

@Component({
  selector: 'app-griglia-elementi',
  standalone: true,
  imports: [CardIndyComponent],
  templateUrl: './griglia-elementi.component.html',
})
export class GrigliaElementiComponent {
  private appConfig = inject(AppConfigService);
  public msu = new MangaSongUtilities();

  public readonly defaultMangaPic: string =
    this.appConfig.config.defaultPicsUrl.manga;
  public readonly defaultSongPic: string =
    this.appConfig.config.defaultPicsUrl.song;

  @Input() eu!: UtenteParodie;
  @Input() userPunteggio!: number;
  @Input() punteggioNecessario!: number;
  @Input() creaProposta!: {
    componente: boolean;
    punteggio: boolean;
  };

  downloadManga(manga: MangaSong) {
    this.msu.downloadManga(manga);
  }

  playSong(song: MangaSong) {
    this.msu.playSong(song);
  }
}
