import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Subject, take, takeUntil } from 'rxjs';
import { AuthCustom } from '../../../../shared/custom/auth-custom.class';
import { ErrorHttpComponent } from '../../../../shared/components/errorhttp.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { User } from '../../../auth/interfaces/users.interface';
import {
  EditableSocial,
  Profilo,
  Tweet,
} from '../../interfaces/profilo.interface';
import { ProfiloUtilities } from '../../utilities/profilo-utilities.class';
import { EditProfiloComponent } from './components/edit-profilo/edit-profilo.component';
import { NewTweetComponent } from './components/new-tweet/new-tweet.component';
import { ChangePicComponent } from './components/change-pic/change-pic.component';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    NewTweetComponent,
    EditProfiloComponent,
    ChangePicComponent,
    TitleCasePipe,
    ErrorHttpComponent,
  ],
  templateUrl: './profilo.component.html',
})
export class ProfiloComponent extends AuthCustom implements OnInit, OnDestroy {
  private profiloUtilities = new ProfiloUtilities();
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
    user: this.getVoidUser(),
    tweets: [] as Tweet[],
  };

  private route = inject(ActivatedRoute);
  private loaderService = inject(LoadingService);

  constructor() {
    super();
    this.setTornaIndietroPath();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.sottoscrizioneParam();
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
      this.sottoscrizioneUtente({
        userFunc: (user) => this.caricaDatiUser(user),
        destroy$: this.destroy$,
      });
    });
  }

  private caricaDatiUser(user: User | null): void {
    if (user && user.id) {
      this.profiloPersonale = this.idUtente == user.id;
      if (this.profiloService.profiloPersonale && this.profiloPersonale) {
        this.profilo = this.profiloService.profiloPersonale;
        this.caricamentoCompletato();
      } else {
        this.sottoscrizioneProfilo(this.idUtente!);
      }
    } else {
      this.sottoscrizioneProfilo(this.idUtente!);
    }
  }

  private sottoscrizioneProfilo(userId: string): void {
    this.profiloService
      .getProfiloById(userId)
      .pipe(
        take(1),
        map((data) => this.profiloUtilities.mapToProfilo(data[0]))
      )
      .subscribe({
        next: (data) => {
          this.setLocalStorage(data);
          this.caricamentoCompletato();
        },
        error: (error) => {
          this.caricamentoFallito();
          console.error('Errore nel recupero del profilo', error);
        },
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
      this.profiloService.profiloPersonale = data;
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
    this.confirmCustom({
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
    this.profiloService
      .deletePubblicazioni(tweetId)
      .pipe(
        take(1),
        finalize(() => this.loaderService.hide())
      )
      .subscribe({
        next: () =>
          (this.profilo.tweets = this.profilo.tweets.filter(
            (tweet: Tweet) => tweet.id != tweetId
          )),
        error: (error) =>
          console.error('Errore nella cancellazione del tweet', error),
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
    const newWindow = window.open('', '_blank');
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
