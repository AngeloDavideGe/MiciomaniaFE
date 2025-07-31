import { signal, WritableSignal } from '@angular/core';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import {
  ListaManga,
  MangaUtente,
  MangaAperto,
} from '../../shared/interfaces/http.interface';
import { Profilo } from '../../shared/interfaces/http.interface';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
} from '../../shared/interfaces/elementiUtente.interface';
import { Social } from '../../shared/interfaces/github.interface';

export class DataHttp {
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
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user.set(JSON.parse(userData));
    }

    const usersData = sessionStorage.getItem('users');
    if (usersData) {
      this.users.set(JSON.parse(usersData));
    }

    const social = sessionStorage.getItem('socialLinks');
    if (social) {
      this.social = JSON.parse(social);
    }

    const listaManga = localStorage.getItem('listaManga');
    if (listaManga) {
      this.listaManga.set(JSON.parse(listaManga));
    }

    const mangaUtente = localStorage.getItem('mangaUtente');
    if (mangaUtente) {
      this.mangaUtente = JSON.parse(mangaUtente);
      this.initialMangaUtente = JSON.parse(mangaUtente);
    }

    const mangaCaricati = sessionStorage.getItem('mangaCaricati');
    if (mangaCaricati) {
      this.mangaScaricati = JSON.parse(mangaCaricati);
    }

    const mangaAperti = sessionStorage.getItem('mangaAperti');
    if (mangaAperti) {
      this.mangaAperti = JSON.parse(mangaAperti);
    }

    const pubblicazioniJSON = sessionStorage.getItem('pubblicazioni');
    if (pubblicazioniJSON) {
      this.profiloPersonale = JSON.parse(pubblicazioniJSON);
    }

    const punteggioOttenuto = sessionStorage.getItem('punteggioOttenuto');
    if (punteggioOttenuto) {
      this.punteggioOttenuto = JSON.parse(punteggioOttenuto);
    }

    const canzoniStorage = localStorage.getItem('canzoniMiciomani');
    if (canzoniStorage) {
      this.canzoniMiciomani = JSON.parse(canzoniStorage);
    }

    const canzoniLoaded = sessionStorage.getItem('canzoniMiciomaniLoaded');
    if (canzoniLoaded) {
      this.canzoniMiciomaniLoaded = JSON.parse(canzoniLoaded);
    }

    const mangaStorage = localStorage.getItem('mangaMiciomani');
    if (mangaStorage) {
      this.mangaMiciomani = JSON.parse(mangaStorage);
    }

    const mangaLoaded = sessionStorage.getItem('mangaMiciomaniLoaded');
    if (mangaLoaded) {
      this.mangaMiciomaniLoaded = JSON.parse(mangaLoaded);
    }

    const storageElementiUtente = sessionStorage.getItem('elementiUtente');
    if (storageElementiUtente) {
      this.elementiUtente = JSON.parse(storageElementiUtente);
    }
  }
}
