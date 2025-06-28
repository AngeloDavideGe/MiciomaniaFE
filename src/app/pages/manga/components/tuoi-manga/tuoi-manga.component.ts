import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorHttpComponent } from '../../../../shared/components/errorhttp.component';
import { AuthService } from '../../../../shared/services/auth.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { MangaCustom } from '../../custom/manga-custom.class';
import {
  ListaManga,
  MangaUtente,
  SezioniMangaUtente,
  SplitMangaUtente,
} from '../../interfaces/manga.interface';
import { CardMangaComponent } from '../../shared/card-manga.component';

type keyofMangaUtente =
  | keyof MangaUtente
  | keyof SplitMangaUtente
  | keyof SezioniMangaUtente;

@Component({
  selector: 'app-tuoi-manga',
  standalone: true,
  imports: [NgIf, NgFor, CardMangaComponent, FormsModule, ErrorHttpComponent],
  templateUrl: './tuoi-manga.component.html',
})
export class TuoiMangaComponent
  extends MangaCustom
  implements OnInit, OnDestroy
{
  public allMangaFiltrati: ListaManga[] = [];
  public mangafiltrati = signal<ListaManga[]>([]);
  public selectedTab: keyofMangaUtente = 'preferiti';
  public searchQuery: string = '';
  public erroreHttp: boolean = false;
  private checkSplitManga: SplitMangaUtente = this.voidSplitManga();
  private sezioneListaManga: SezioniMangaUtente = {
    preferiti: [],
    letti: [],
    completati: [],
  };

  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const user = this.authService.user();
    if (user) {
      this.loadListaManga(user.id);
    } else {
      this.router.navigate(['/manga']);
    }
  }

  ngOnDestroy(): void {
    const mangaUtente: MangaUtente = {
      preferiti: this.sezioneListaManga.preferiti.map((x) => x.id).join(', '),
      letti: this.sezioneListaManga.letti.map((x) => x.id).join(', '),
      completati: this.sezioneListaManga.completati.map((x) => x.id).join(', '),
    } as MangaUtente;
    localStorage.setItem('mangaUtente', JSON.stringify(mangaUtente));
  }

  private loadListaManga(idUtente: string | null): void {
    const ms = this.mangaService;
    if (!ms.mangaScaricati) {
      ms.listaManga.length == 0 ? this.loadingService.show() : null;
      this.inizializzaLista({
        idUtente: idUtente,
        caricaManga: (data) => {
          this.caricaMangaEPreferiti({
            data: data,
            caricaMangaUtente: () => {
              localStorage.setItem(
                'mangaUtente',
                JSON.stringify(data.manga_utente[0])
              );
            },
            caricaListaManga: (listamanga) => {
              this.caricaManga(listamanga);
            },
          });
        },
        caricamentoFallito: () => this.caricamentoFallito(),
      });
    } else {
      this.copiaSplitUtente();
      this.filterMangaFunc('preferiti');
      this.loadingService.hide();
    }
  }

  private caricamentoFallito(): void {
    this.erroreHttp = true;
    this.loadingService.hide();
  }

  private caricaManga(lista: ListaManga[]): void {
    this.mangaService.listaManga = lista;
    this.allMangaFiltrati = lista;
    this.copiaSplitUtente();
    this.filterMangaFunc('preferiti');
    this.loadingService.hide();
  }

  private copiaSplitUtente(): void {
    const mangaUtente = JSON.parse(localStorage.getItem('mangaUtente') || '{}');
    this.sezioneListaManga = this.createSezioneMangaUtente(mangaUtente);
  }

  filterMangaFunc(tab: keyofMangaUtente): void {
    this.searchQuery = '';
    this.selectedTab = tab;
    this.filterManga(tab);
  }

  private filterManga(key: keyofMangaUtente): void {
    this.checkSplitManga = this.voidSplitManga();
    if (this.sezioneListaManga[key].length > 0) {
      this.mangafiltrati.set(this.sezioneListaManga[key]);
    } else {
      this.mangafiltrati.set([]);
    }
  }

  cercaNuoviManga(event: Event): void {
    const query: string =
      (event.target as HTMLInputElement).value.toLowerCase() || '';

    this.allMangaFiltrati = this.mangaService.listaManga.filter((manga) =>
      manga.nome.toLowerCase().includes(query)
    );
  }

  rimuoviMangaTab(idManga: number): void {
    this.sezioneListaManga[this.selectedTab] = this.sezioneListaManga[
      this.selectedTab
    ].filter((x) => x.id != idManga);

    this.mangafiltrati.set(this.sezioneListaManga[this.selectedTab]);
  }

  aggiungiMangaTab(idManga: number) {
    if (
      !this.sezioneListaManga[this.selectedTab]
        .map((x) => x.id)
        .includes(idManga)
    ) {
      const mangaTrovato: ListaManga | undefined =
        this.mangaService.listaManga.find((x) => x.id == idManga);

      if (mangaTrovato) {
        this.sezioneListaManga[this.selectedTab].push(mangaTrovato);
        this.mangafiltrati.set(this.sezioneListaManga[this.selectedTab]);
      }
    }

    this.searchQuery = '';
  }

  onSelezionato(checkbox: boolean, idManga: number): void {
    if (checkbox) {
      this.checkSplitManga[this.selectedTab].push(idManga);
    } else {
      this.checkSplitManga[this.selectedTab] = this.checkSplitManga[
        this.selectedTab
      ].filter((x) => x != idManga);
    }
  }

  spostaMangaSelezionati(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case 'Letti':
        if (this.selectedTab != 'letti') {
          this.changeCheckManga('completati', 'letti');
        }
        break;
      case 'Completati':
        if (this.selectedTab != 'completati') {
          this.changeCheckManga('letti', 'completati');
        }
        break;
      case 'Elimina':
        this.deleteCheckManga(this.selectedTab);
        break;
    }
    (event.target as HTMLSelectElement).value = '';
  }

  private changeCheckManga(
    tabRemove: keyofMangaUtente,
    tabPush: keyofMangaUtente
  ): void {
    const valoriDaSpostare: number[] = this.checkSplitManga[tabRemove];
    const mangaDaAggiungere: ListaManga[] = this.mangaService.listaManga.filter(
      (manga) => valoriDaSpostare.includes(manga.id)
    );

    mangaDaAggiungere.forEach((manga) => {
      if (!this.sezioneListaManga[tabPush].some((x) => x.id == manga.id)) {
        this.sezioneListaManga[tabPush].push(manga);
      }
    });

    this.deleteCheckManga(tabRemove);
  }

  private deleteCheckManga(tabRemove: keyofMangaUtente): void {
    const checkSplitMangaSet = new Set(this.checkSplitManga[tabRemove]);

    this.sezioneListaManga[tabRemove] = this.sezioneListaManga[
      tabRemove
    ].filter((x) => !checkSplitMangaSet.has(x.id));

    this.mangafiltrati.set([...this.sezioneListaManga[tabRemove]]);

    this.checkSplitManga = this.voidSplitManga();
  }
}
