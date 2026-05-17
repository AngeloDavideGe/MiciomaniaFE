import { Component, inject, Input } from '@angular/core';
import { AppConfigService } from '../../../../../../../core/api/appConfig.service';
import { CardCustomComponent } from '../../../../../../../../library/components/card/card.component';
import {
  MangaSong,
  UtenteParodie,
} from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../../../shared/utilities/class/mangaSong.utilities';
import { ElemLang } from '../../languages/interfaces/elem-lang.interface';

@Component({
  selector: 'app-griglia-elementi',
  standalone: true,
  imports: [CardCustomComponent],
  templateUrl: './griglia-elementi.component.html',
})
export class GrigliaElementiComponent {
  private appConfig = inject(AppConfigService);
  public msu = new MangaSongUtilities();

  public readonly defaultMangaPic: string =
    this.appConfig.config.defaultPicsUrl.manga;
  public readonly defaultSongPic: string =
    this.appConfig.config.defaultPicsUrl.song;

  @Input() elemLang!: ElemLang;
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
