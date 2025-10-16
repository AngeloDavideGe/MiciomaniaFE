import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { loadMangaVolumiENome } from '../../../functions/manga.functions';
import {
  InfoManga,
  MangaENome,
  MangaVolume,
} from '../../../interfaces/manga.interface';
import { PadZeroVolumePipe } from '../../../pipes/padZeroVolume.pipe';
import { DataHttp } from '../../../../../core/api/http.data';
import { MangaService } from '../../../services/manga.service';
import { BottonCustomComponent } from '../../../../../shared/components/custom/botton-custom.component';
import {
  Lingua,
  MangaAperto,
} from '../../../../../shared/interfaces/http.interface';
import {
  VolumiLang,
  VolumiLangType,
} from './languages/interfaces/volumi-lang.interface';

@Component({
  selector: 'app-volumi-manga',
  standalone: true,
  imports: [PadZeroVolumePipe, BottonCustomComponent],
  templateUrl: './volumi-manga.component.html',
})
export class VolumiMangaComponent implements OnInit {
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private mangaService = inject(MangaService);
  private loadingService = inject(LoadingService);

  public volumiOpera: MangaVolume[] = [];
  public volumiCaricati: boolean = false;
  public tornaIndietroPath: string = '';
  public nomeOpera: string = '';
  public volumiLang: VolumiLang = {} as VolumiLang;

  constructor() {
    this.loadLanguage();
    this.setPathTornaIndietro();
  }

  ngOnInit(): void {
    this.sottoscrizioneRouterParams();
  }

  private loadLanguage(): void {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<VolumiLangType>> = {
      it: () => import('./languages/constants/volumi-it.constant'),
      en: () => import('./languages/constants/volumi-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.volumiLang = m.volumiLang));
  }

  private setPathTornaIndietro(): void {
    const nameComponent =
      this.router.getCurrentNavigation()?.extras.state?.['message'];
    switch (nameComponent) {
      case '_MangaComponent':
        this.tornaIndietroPath = '/manga';
        break;
      case '_TuoiMangaComponent':
        this.tornaIndietroPath = '/manga/tuoi-manga';
        break;
      default:
        this.tornaIndietroPath = '/manga';
        break;
    }
  }

  private sottoscrizioneRouterParams(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.loadVolumiENome(params['nome']);
    });
  }

  private loadVolumiENome(path: string): void {
    if (DataHttp.mangaAperti[path]) {
      this.loadNoHttp(path);
    } else {
    }
  }

  private loadNoHttp(path: string): void {
    const mangaAperto: MangaAperto = DataHttp.mangaAperti[path];
    const volumi: MangaVolume[] = mangaAperto.volumi;
    const info_manga: InfoManga = {
      nome: mangaAperto.nome,
      completato: false,
    };

    this.handleNomeEVolumiSuccess({
      info_manga,
      volumi,
    } as MangaENome);

    this.volumiCaricati = true;
  }

  private completeLoading(path: string): void {
    this.volumiCaricati = true;
    this.loadingService.hide();
    DataHttp.mangaAperti[path] = {
      nome: this.nomeOpera,
      volumi: this.volumiOpera,
    };
  }

  private handleNomeEVolumiSuccess(opera: MangaENome): void {
    this.nomeOpera = opera.info_manga.nome;
    this.volumiOpera = opera.volumi;
  }

  leggiVolume(link: string): void {
    window.open(link);
  }
}
