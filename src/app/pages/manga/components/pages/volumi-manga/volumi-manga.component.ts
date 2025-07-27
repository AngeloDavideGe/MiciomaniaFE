import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { loadMangaVolumiENome } from '../../../functions/manga.functions';
import { MangaHandler } from '../../../handlers/manga.handler';
import {
  InfoManga,
  MangaENome,
  MangaVolume,
} from '../../../interfaces/manga.interface';
import { PadZeroVolumePipe } from '../../../pipes/padZeroVolume.pipe';

@Component({
  selector: 'app-volumi-manga',
  standalone: true,
  imports: [PadZeroVolumePipe],
  templateUrl: './volumi-manga.component.html',
})
export class VolumiMangaComponent implements OnInit {
  public volumiOpera: MangaVolume[] = [];
  public operaCompletata: boolean = false;
  public volumiCaricati: boolean = false;
  public tornaIndietroPath: string = '';
  public pathOpera: string = '';
  public nomeOpera: string = '';

  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private mangaHandler = inject(MangaHandler);
  private loadingService = inject(LoadingService);

  constructor() {
    this.setPathTornaIndietro();
  }

  ngOnInit(): void {
    this.sottoscrizioneRouterParams();
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
      this.pathOpera = params['nome'];
      this.loadVolumiENome();
    });
  }

  private loadVolumiENome(): void {
    const index: number = this.mangaHandler.mangaAperti.findIndex(
      (x) => x.nome == this.pathOpera
    );
    if (index > -1) {
      this.loadNoHttp(index);
    } else {
      loadMangaVolumiENome({
        pathOpera: this.pathOpera,
        loadingFunction: () => this.loadingService.show(),
        loadVolumiFunc: (pathOpera) =>
          this.mangaHandler.mangaService.getNomeEVolumiMangaByPath(pathOpera),
        finalizeFunction: () => this.completeLoading(),
        nextCallback: (data) => this.handleNomeEVolumiSuccess(data),
      });
    }
  }

  private loadNoHttp(index: number): void {
    const volumi: MangaVolume[] = this.mangaHandler.mangaAperti[index].volumi;
    const info_manga: InfoManga = {
      nome: this.pathOpera,
      completato: false,
    };

    this.handleNomeEVolumiSuccess({
      info_manga: info_manga,
      volumi: volumi,
    } as MangaENome);

    this.volumiCaricati = true;
  }

  private completeLoading(): void {
    this.volumiCaricati = true;
    this.loadingService.hide();
  }

  private handleNomeEVolumiSuccess(opera: MangaENome): void {
    this.nomeOpera = opera.info_manga.nome;
    this.operaCompletata = opera.info_manga.completato;
    this.volumiOpera = opera.volumi;
    this.mangaHandler.mangaAperti.push({
      nome: this.pathOpera,
      volumi: this.volumiOpera,
    });
  }

  leggiVolume(link: string): void {
    window.open(link);
  }
}
