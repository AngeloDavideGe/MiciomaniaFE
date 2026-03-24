import { signal, WritableSignal } from '@angular/core';
import { Posts } from '../../pages/posts/components/shared/post.interface';
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
  static allUsers: User[] = [];
  static mangaUtente: WritableSignal<MangaUtente | null> = signal(null);
  static initialMangaUtente: MangaUtente = {} as MangaUtente;

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
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);

      if (userData.user) {
        this.user.set(userData.user);
      }

      if (userData.allUsers) {
        this.allUsers = userData.allUsers;
      }

      if (userData.lingua) {
        this.lingua.set(userData.lingua);
      }

      if (userData.postVisti) {
        this.postVisti = userData.postVisti;
      }

      if (userData.gruppiChat) {
        this.gruppiChat = userData.gruppiChat;
      }
    }

    const userId = this.user()?.id;
    if (userId) {
      const sessionDataStr = sessionStorage.getItem(userId);
      if (sessionDataStr) {
        const sessionData = JSON.parse(sessionDataStr);

        if (sessionData.mangaUtente) {
          this.mangaUtente.set(sessionData.mangaUtente);
          this.initialMangaUtente = sessionData.mangaUtente;
        }

        if (sessionData.pubblicazioni) {
          this.profiloPersonale = sessionData.pubblicazioni;
        }

        if (sessionData.punteggioOttenuto) {
          this.punteggioOttenuto = sessionData.punteggioOttenuto;
        }
      }
    }
  }
}
