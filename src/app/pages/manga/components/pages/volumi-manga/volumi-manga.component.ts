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
import { MangaAperto } from '../../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-volumi-manga',
  standalone: true,
  imports: [PadZeroVolumePipe, BottonCustomComponent],
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
  private mangaService = inject(MangaService);
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
    const index: number = DataHttp.mangaAperti.findIndex(
      (x: MangaAperto) => x.nome == this.pathOpera
    );
    if (index > -1) {
      this.loadNoHttp(index);
    } else {
      loadMangaVolumiENome({
        pathOpera: this.pathOpera,
        loadingFunction: () => this.loadingService.show(),
        loadVolumiFunc: (pathOpera) =>
          this.mangaService.getNomeEVolumiMangaByPath(pathOpera),
        finalizeFunction: () => this.completeLoading(),
        nextCallback: (data) => this.handleNomeEVolumiSuccess(data),
      });
    }
  }

  private loadNoHttp(index: number): void {
    const volumi: MangaVolume[] = DataHttp.mangaAperti[index].volumi;
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
    DataHttp.mangaAperti.push({
      nome: this.pathOpera,
      volumi: this.volumiOpera,
    });
  }

  leggiVolume(link: string): void {
    window.open(link);
  }
}
