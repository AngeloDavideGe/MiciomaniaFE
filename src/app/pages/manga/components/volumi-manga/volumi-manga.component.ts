import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, take } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
import { MangaHandler } from '../../handlers/manga.handler';
import { MangaVolume } from '../../interfaces/manga.interface';
import { PadZeroVolumePipe } from '../../pipes/padZeroVolume.pipe';

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
      this.controlloOperaLocalStorage();
    });
  }

  private controlloOperaLocalStorage(): void {
    const opera = JSON.parse(localStorage.getItem(this.pathOpera) || 'null');
    if (opera) {
      this.nomeOpera = opera.nome;
      this.volumiOpera = opera.volumi;
      this.completeLoading();
    } else {
      this.controlloOperaByService();
    }
  }

  private controlloOperaByService(): void {
    this.loadingService.show();
    if (this.mangaHandler.mangaSelected) {
      this.nomeOpera = this.mangaHandler.mangaSelected.nome;
      this.operaCompletata = this.mangaHandler.mangaSelected.completato;
      this.loadVolumi();
    } else {
      this.fetchMangaData({
        loadVolumiFunc: (pathOpera) =>
          this.mangaHandler.mangaService.getNomeEVolumiMangaByPath(pathOpera),
        nextCallback: (data) => this.handleNomeEVolumiSuccess(data),
      });
    }
  }

  private loadVolumi(): void {
    const index: number = this.mangaHandler.mangaAperti.findIndex(
      (x) => x.nome == this.pathOpera
    );
    if (index > -1) {
      this.handleVolumiSuccess(this.mangaHandler.mangaAperti[index].volumi);
    } else {
      this.fetchMangaData({
        loadVolumiFunc: (pathOpera) =>
          this.mangaHandler.mangaService.getVolumiManga(pathOpera),
        nextCallback: (data) => this.handleVolumiSuccess(data.volumi),
      });
    }
  }

  private fetchMangaData(params: {
    loadVolumiFunc: (path: string) => Observable<any>;
    nextCallback: (data: any) => void;
  }) {
    params
      .loadVolumiFunc(this.pathOpera)
      .pipe(
        take(1),
        finalize(() => this.completeLoading())
      )
      .subscribe({
        next: (data) => params.nextCallback(data),
        error: () => console.error('Si è verificato un errore'),
      });
  }

  private completeLoading(): void {
    this.volumiCaricati = true;
    this.loadingService.hide();
  }

  private handleNomeEVolumiSuccess(opera: any): void {
    this.nomeOpera = opera.info_manga.nome;
    this.operaCompletata = opera.info_manga.completato;
    this.volumiOpera = opera.volumi;
    this.mangaHandler.mangaAperti.push({
      nome: this.pathOpera,
      volumi: this.volumiOpera,
    });
  }

  private handleVolumiSuccess(volumi: MangaVolume[]): void {
    this.volumiOpera = volumi;
    this.mangaHandler.mangaAperti.push({
      nome: this.pathOpera,
      volumi: this.volumiOpera,
    });
    this.completeLoading();
  }

  leggiVolume(link: string): void {
    window.open(link);
  }
}
