import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import {
  Canzoni,
  OpereToolbar,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { canzoni_imports } from './canzoni.import';
import { getCanzoniToolbar } from './functions/canzoni.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { AudioService } from '../../../../shared/services/audio.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: canzoni_imports,
  templateUrl: './canzoni.component.html',
  styleUrl: './canzoni.component.scss',
})
export class CanzoniComponent implements OnInit {
  private opereService = inject(OpereService);
  private audioService = inject(AudioService);

  private currentButton: string | null = null;

  public searchQuery = signal<string>('');
  public debaunceQuery = signal<string>('');
  public currentCanzone = signal<string | null>(null);

  public canzoniToolbar = computed<OpereToolbar[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();

    let cantanti: Record<string, boolean> = {};
    canzoni.forEach((canzoni: Canzoni) => (cantanti[canzoni.autore] = true));
    const volumi: number = Object.values(cantanti).length;

    return getCanzoniToolbar(volumi, canzoni.length);
  });

  public canzoni = computed<iCard[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();

    const cards: iCard[] = canzoni.map((canzone: Canzoni) => {
      const card: iCard = {
        titolo: canzone.nome,
        urlPic: canzone.copertina,
        descrizione: canzone.genere,
        bottone: 'Ascolta',
        azione: () => {
          if (this.currentButton && this.currentButton == canzone.nome) {
            this.audioService.stopTrack();
          } else {
            this.audioService.playTrack(canzone.path.replace('dl=0', 'dl=1'));
          }
        },
      };

      return card;
    });

    return cards;
  });

  public filtriCanzoni = GetFiltriCustom<iCard, null>({
    elemTable: this.canzoni,
    select: [
      {
        key: 'titolo',
        query: this.debaunceQuery,
      },
      {
        key: 'descrizione',
        query: this.debaunceQuery,
      },
    ],
  });

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debaunceQuery.set(value),
    );

    effect(() => (this.currentButton = this.currentCanzone()));
  }

  ngOnInit(): void {
    handlerFunc<Canzoni[]>({
      skipCall: this.opereService.canzoniLoaded,
      callHttp: () => this.opereService.getAllCanzoni(),
      nextCall: (data: Canzoni[]) => this.opereService.canzoni.set(data),
      errorCall: () => (this.opereService.canzoniLoaded = false),
    });

    this.opereService.canzoniLoaded = true;
  }
}
