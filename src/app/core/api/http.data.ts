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
import { GruppiChat } from '../components/chat/interfaces/chat.interface';

export class DataHttp {
  static lingua: WritableSignal<Lingua> = signal(Lingua.it);

  static user: WritableSignal<User | null> = signal(null);
  static users: WritableSignal<UserParams[]> = signal([]);
  static social: Social[] = [];

  static listaManga: WritableSignal<ListaManga[]> = signal([]);
  static mangaUtente: MangaUtente = {} as MangaUtente;
  static initialMangaUtente: MangaUtente = {} as MangaUtente;
  static mangaAperti: Record<string, MangaAperto> = {};
  static mangaScaricati: boolean = false;

  static profiloPersonale: Profilo | null = null;
  static punteggioOttenuto: number = 0;

  static canzoniMiciomani: CanzoniMiciomania[] = [];
  static canzoniMiciomaniLoaded = false;
  static mangaMiciomani: MangaMiciomania[] = [];
  static mangaMiciomaniLoaded = false;
  static elementiUtente: ElementiUtente | null = null;

  static gruppiChat: GruppiChat = {
    listaGruppi: [],
    messaggi: {},
    ultimoId: 0,
  };

  static loadDataHttp(): void {
    const lingua = localStorage.getItem('lingua');
    if (lingua) {
      this.lingua.set(JSON.parse(lingua));
    }

    // Auth Service
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

    // Manga Service
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

    // Profilo Service
    const pubblicazioniJSON = sessionStorage.getItem('pubblicazioni');
    if (pubblicazioniJSON) {
      this.profiloPersonale = JSON.parse(pubblicazioniJSON);
    }

    // Squadre Service
    const punteggioOttenuto = sessionStorage.getItem('punteggioOttenuto');
    if (punteggioOttenuto) {
      this.punteggioOttenuto = JSON.parse(punteggioOttenuto);
    }

    // Elementi Utente
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

    // Messaggi
    const gruppiChat = localStorage.getItem('gruppiChat');
    if (gruppiChat) {
      this.gruppiChat = JSON.parse(gruppiChat);
    }
  }
}
