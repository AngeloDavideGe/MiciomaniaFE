import { signal, WritableSignal } from '@angular/core';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import {
  ListaManga,
  MangaUtente,
  MangaAperto,
} from '../../shared/interfaces/http.interface';
import { Profilo } from '../../shared/interfaces/http.interface';

export class DataHttp {
  public static user: WritableSignal<User | null> = signal<User | null>(null);
  public static users: WritableSignal<UserParams[]> = signal<UserParams[]>([]);

  public static listaManga: ListaManga[] = [];
  public static mangaUtente: MangaUtente = {} as MangaUtente;
  public static initialMangaUtente: MangaUtente = {} as MangaUtente;
  public static mangaAperti: MangaAperto[] = [];
  public static mangaScaricati: boolean = false;

  public static profiloPersonale: Profilo | null = null;
  public static punteggioOttenuto: number = 0;

  static loadDataHttp(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user.set(JSON.parse(userData));
    }

    const usersData = sessionStorage.getItem('users');
    if (usersData) {
      this.users.set(JSON.parse(usersData));
    }

    const listaManga = localStorage.getItem('listaManga');
    if (listaManga) {
      this.listaManga = JSON.parse(listaManga);
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
  }
}
