import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthHandler } from '../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../shared/interfaces/users.interface';
import { LoadingService } from '../../../../../shared/services/loading.service';
import {
  EditableSocial,
  Profilo,
  Tweet,
} from '../../../interfaces/profilo.interface';
import { profilo_imports } from './imports/profilo.imports';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: profilo_imports,
  templateUrl: './profilo.component.html',
})
export class ProfiloComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private loaderService = inject(LoadingService);
  public authHandler = inject(AuthHandler);

  private destroy$ = new Subject<void>();
  private idUtente: string | null = null;
  public profiloPersonale: boolean = false;
  public utenteCaricato: boolean = false;
  public errorHttp: boolean = false;
  public modaleApertaTweet: boolean = false;
  public modaleApertaModifiche: boolean = false;
  public modaleApertaChangePic: boolean = false;
  public socialArray: EditableSocial[] = [];
  public tornaIndietroPath: string = '';
  public profilo: Profilo = {
    user: this.authHandler.getVoidUser(),
    tweets: [] as Tweet[],
  };

  // @Template() spinnerTemplate = `
  //   <div
  //     class="spinner-border text-dark rounded-circle me-3"
  //     role="status"
  //     style="width: 50px; height: 50px"
  //   >
  //     <span class="visually-hidden">Loading...</span>
  //   </div>
  // `;

  constructor() {
    this.sottoscrizioneParam();
    this.setTornaIndietroPath();
  }

  ngOnInit(): void {
    this.loaderService.show();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setTornaIndietroPath(): void {
    const state = this.router.getCurrentNavigation()?.extras.state?.['message'];
    switch (state) {
      case '_TableUserParamsComponent':
        this.tornaIndietroPath = '/home/admin';
        break;
      default:
        this.tornaIndietroPath = '/home';
        break;
    }
  }

  private sottoscrizioneParam(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.idUtente = params['id'];
      effect(() => {
        const user: User | null = this.authHandler.user();
        this.caricaDatiUser(user);
      });
    });
  }

  private caricaDatiUser(user: User | null): void {
    if (user && user.id) {
      this.profiloPersonale = this.idUtente == user.id;
      if (
        this.authHandler.profiloHandler.profiloPersonale &&
        this.profiloPersonale
      ) {
        this.profilo = this.authHandler.profiloHandler.profiloPersonale;
        this.caricamentoCompletato();
      } else {
        this.sottoscrizioneProfilo(this.idUtente!);
      }
    } else {
      this.sottoscrizioneProfilo(this.idUtente!);
    }
  }

  private sottoscrizioneProfilo(userId: string): void {
    this.authHandler.profiloHandler.getProfiloById({
      userId: userId,
      setLocalStorage: (profilo: Profilo) => this.setLocalStorage(profilo),
      caricamentoCompletato: () => this.caricamentoCompletato(),
      caricamentoFallito: () => this.caricamentoFallito(),
    });
  }

  private caricamentoCompletato(): void {
    this.loadSocial();
    this.loaderService.hide();
    this.utenteCaricato = true;
  }

  private caricamentoFallito(): void {
    this.loaderService.hide();
    this.errorHttp = true;
  }

  private setLocalStorage(data: Profilo): void {
    this.profilo = data;
    if (this.profiloPersonale) {
      this.authHandler.profiloHandler.profiloPersonale = data;
      localStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('pubblicazioni', JSON.stringify(data));
    }
  }

  loadSocial(): void {
    this.socialArray = Object.entries(
      this.profilo.user.profile.social || {}
    ).map(([key, link]) => ({
      key,
      link,
    }));
  }

  eliminaTweet(tweetId: number): void {
    this.authHandler.confirmCustom({
      titolo: 'Elimina Tweet',
      messaggio: 'Sei sicuro di voler eliminare questo tweet?',
      buttonNo: 'Annulla',
      buttonSi: 'Conferma',
      confirmFunc: () => {
        this.confirmEliminaTweet(tweetId);
      },
    });
  }

  private confirmEliminaTweet(tweetId: number): void {
    this.loaderService.show();
    this.authHandler.profiloHandler.deletePubblicazioneById({
      tweetId: tweetId,
      finalizeCall: () => this.loaderService.hide(),
      nextCall: () => {
        this.profilo.tweets = this.profilo.tweets.filter(
          (tweet: Tweet) => tweet.id != tweetId
        );
      },
    });
  }

  openLink(link: string): void {
    try {
      const url = new URL(link);

      if (url.protocol === 'http:' || url.protocol === 'https:') {
        window.open(link, '_blank');
      } else {
        this.openInvalidLinkPage();
      }
    } catch (e) {
      this.openInvalidLinkPage();
    }
  }

  private openInvalidLinkPage(): void {
    const newWindow: Window | null = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(this.getErrorPage());
      newWindow.document.close();
    }
  }

  private getErrorPage(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Link non valido</title>
        <style>
          body {
            font-family: 'Roboto', Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }
          h1 {
            color: #e63946;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
          }
          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #0056b3;
          }
          .icon {
            font-size: 50px;
            color: #e63946;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">⚠️</div>
          <h1>Link non valido</h1>
          <p>Il collegamento a cui stai cercando di accedere non è disponibile o non esiste.</p>
          <button onclick="window.close()">Chiudi questa finestra</button>
        </div>
      </body>
      </html>
    `;
  }
}
function Template(): (
  target: ProfiloComponent,
  propertyKey: 'spinnerTemplate'
) => void {
  throw new Error('Function not implemented.');
}
