import { Component, Input } from '@angular/core';
import { CardCustomComponent } from '../../../../../../../shared/components/custom/card-custom.component';
import { UtenteParodie } from '../../../../../../../shared/interfaces/elementiUtente.interface';
import { MangaSongUtilities } from '../../../../../../../shared/utilities/mangaSong.utilities';
import { ElemLang } from '../../languages/interfaces/elem-lang.interface';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-griglia-elementi',
  standalone: true,
  imports: [CardCustomComponent],
  templateUrl: './griglia-elementi.component.html',
  // styles: [``],
})
export class GrigliaElementiComponent {
  public msu = new MangaSongUtilities();
  public readonly defaultMangaPic: string = environment.defaultPicsUrl.manga;
  public readonly defaultSongPic: string = environment.defaultPicsUrl.song;

  @Input() elemLang!: ElemLang;
  @Input() eu!: UtenteParodie;
  @Input() userPunteggio!: number;
  @Input() punteggioNecessario!: number;
  @Input() creaProposta!: {
    componente: boolean;
    punteggio: boolean;
  };
}
