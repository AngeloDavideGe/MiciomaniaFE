import { signal, WritableSignal } from '@angular/core';
import { Posts } from '../../pages/posts/components/shared/post.interface';
import { UtenteParodie } from '../../shared/interfaces/elementiUtente.interface';
import { Social } from '../../shared/interfaces/github.interface';
import {
  Lingua,
  MangaUtente,
  Profilo,
} from '../../shared/interfaces/http.interface';
import { User } from '../../shared/interfaces/users.interface';
import { GruppiChat } from '../components/chat/interfaces/chat.interface';

export class DataHttp {
  static lingua: WritableSignal<Lingua> = signal(Lingua.it);

  static user: WritableSignal<User | null> = signal(null);

  static mangaUtente: MangaUtente | null = null;
  static initialMangaUtente: MangaUtente = {} as MangaUtente;

  static elementiUtente: UtenteParodie = {} as UtenteParodie;
  static profiloPersonale: Profilo | null = null;
  static postVisti: Posts = { oldPosts: [], lastUpdated: new Date(0) };
  static punteggioOttenuto: number = 0;

  static gruppiChat: GruppiChat = {
    listaGruppi: [],
    messaggi: {},
    messaggiCambiati: {},
    ultimoAggiornamento: new Date(),
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

    // Manga Service
    const mangaUtente = sessionStorage.getItem('mangaUtente');
    if (mangaUtente) {
      this.mangaUtente = JSON.parse(mangaUtente);
      this.initialMangaUtente = JSON.parse(mangaUtente);
    }

    // Post Service
    const pubblicazioniJSON = sessionStorage.getItem('pubblicazioni');
    if (pubblicazioniJSON) {
      this.profiloPersonale = JSON.parse(pubblicazioniJSON);
    }

    const postsVisti = localStorage.getItem('postVisti');
    if (postsVisti) {
      this.postVisti = JSON.parse(postsVisti);
    }

    // Squadre Service
    const punteggioOttenuto = sessionStorage.getItem('punteggioOttenuto');
    if (punteggioOttenuto) {
      this.punteggioOttenuto = JSON.parse(punteggioOttenuto);
    }

    // Elementi Utente Service
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
