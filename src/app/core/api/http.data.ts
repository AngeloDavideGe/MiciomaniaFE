import { signal, WritableSignal } from '@angular/core';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import {
  ListaManga,
  MangaUtente,
  MangaAperto,
  Lingua,
} from '../../shared/interfaces/http.interface';
import { Profilo } from '../../shared/interfaces/http.interface';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
} from '../../shared/interfaces/elementiUtente.interface';
import { Social } from '../../shared/interfaces/github.interface';

export class DataHttp {
  public static lingua: WritableSignal<Lingua> = signal(Lingua.it);

  public static user: WritableSignal<User | null> = signal(null);
  public static users: WritableSignal<UserParams[]> = signal([]);
  public static social: Social[] = [];

  public static listaManga: WritableSignal<ListaManga[]> = signal([]);
  public static mangaUtente: MangaUtente = {} as MangaUtente;
  public static initialMangaUtente: MangaUtente = {} as MangaUtente;
  public static mangaAperti: MangaAperto[] = [];
  public static mangaScaricati: boolean = false;

  public static profiloPersonale: Profilo | null = null;
  public static punteggioOttenuto: number = 0;

  public static canzoniMiciomani: CanzoniMiciomania[] = [];
  public static canzoniMiciomaniLoaded = false;
  public static mangaMiciomani: MangaMiciomania[] = [];
  public static mangaMiciomaniLoaded = false;
  public static elementiUtente: ElementiUtente | null = null;

  static loadDataHttp(): void {
    const lingua = localStorage.getItem('lingua');
    if (lingua) {
      this.lingua.set(JSON.parse(lingua));
    }
  }
}
