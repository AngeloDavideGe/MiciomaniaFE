import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import {
  Canzoni,
  CanzoniGet,
  OpereToolbar,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import { canzoni_imports } from './canzoni.import';
import {
  defaultCanzoniArrayPags,
  getCanzoniSidebar,
  getCanzoniToolbar,
} from './functions/canzoni.function';
import { AudioService } from '../../../../../library/dialogs/audio/audio.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-canzoni',
  standalone: true,
  imports: canzoni_imports,
  templateUrl: './canzoni.component.html',
  styleUrl: './canzoni.component.scss',
})
export class CanzoniComponent implements OnInit {
  private opereService = inject(OpereService);
  private audioService = inject(AudioService);
  private authService = inject(AuthService);

  public readonly categorie = getCanzoniSidebar();
  public readonly arrayRaggi = defaultCanzoniArrayPags();

  public currentButton: string | null = null;
  public currentButtonSignal = signal<string | null>(null);

  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');
  public currentCategoria = signal<string>('tutte');

  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );

  public canzoniToolbar = computed<OpereToolbar[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();
    let cantanti: Record<string, boolean> = {};

    canzoni.forEach((canzoni: Canzoni) => {
      cantanti[canzoni.autore] = true;
    });

    const volumi: number = Object.values(cantanti).length;
    return getCanzoniToolbar(volumi, canzoni.length);
  });

  public canzoni = computed<iCard[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();
    return canzoni.map((canzone: Canzoni) => this.mapCanzoneToCard(canzone));
  });

  public canzoniPreferite = computed<iCard[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();
    const preferiti: string | null | undefined =
      this.opereService.mangaUtente()?.canzonimicio;

    if (!preferiti || canzoni.length === 0) return [];

    let recordPreferiti: Record<string, boolean> = {};
    let canzoniPreferite: Canzoni[] = [];

    preferiti.split(',').forEach((id: string) => {
      recordPreferiti[id] = true;
    });

    canzoni.forEach((canzone: Canzoni) => {
      if (recordPreferiti[canzone.id.toString()]) {
        canzoniPreferite.push(canzone);
      }
    });

    return canzoniPreferite.map((canzone: Canzoni) =>
      this.mapCanzoneToCard(canzone),
    );
  });

  public filtri = computed<FiltriInterface<iCard>>(() => {
    const categoria: string = this.currentCategoria();

    if (categoria === 'preferite') {
      return this.getFiltriCanzoni(this.canzoniPreferite);
    } else {
      return this.getFiltriCanzoni(this.canzoni);
    }
  });

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debounceQuery.set(value),
    );
  }

  ngOnInit(): void {
    handlerFunc<CanzoniGet>({
      skipCall: this.opereService.canzoniLoaded,
      callHttp: () => this.opereService.getAllCanzoni(this.currentUser()),
      nextCall: (data: CanzoniGet) => {
        this.opereService.canzoni.set(data.canzoni);
        this.opereService.mangaUtente.set(data.mangaUtente);
      },
      errorCall: () => (this.opereService.canzoniLoaded = false),
    });

    this.opereService.canzoniLoaded = true;
  }

  private getFiltriCanzoni(canzoni: Signal<iCard[]>): FiltriInterface<iCard> {
    return GetFiltriCustom<iCard, null>({
      elemTable: canzoni,
      select: [
        {
          key: 'titolo',
          query: this.debounceQuery,
        },
        {
          key: 'descrizione',
          query: this.debounceQuery,
        },
      ],
    });
  }

  private mapCanzoneToCard(canzone: Canzoni): iCard {
    return {
      titolo: canzone.nome,
      urlPic: canzone.copertina,
      descrizione: canzone.genere,
      bottone: 'Ascolta',
      azione: () => {
        if (this.currentButton && this.currentButton == canzone.nome) {
          this.audioService.stopTrack();
        } else {
          this.audioService.playTrack(
            canzone.path.replace('dl=0', 'dl=1'),
            () => this.currentButtonSignal.set(null),
          );
        }
      },
    };
  }
}
