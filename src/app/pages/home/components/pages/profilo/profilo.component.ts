import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthHandler } from '../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../shared/interfaces/users.interface';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { ProfiloHandler } from '../../../handlers/profilo.handler';
import {
  EditableSocial,
  Profilo,
  Tweet,
} from '../../../interfaces/profilo.interface';
import { profilo_imports } from './imports/profilo.imports';
import { modaleApertaType } from './types/profilo.type';

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
  public profiloHandler = inject(ProfiloHandler);

  private destroy$ = new Subject<void>();
  private idUtente: string | null = null;
  public profiloPersonale: boolean = false;
  public utenteCaricato: boolean = false;
  public errorHttp: boolean = false;
  public modaleAperta: modaleApertaType = '';
  public socialArray: EditableSocial[] = [];
  public tornaIndietroPath: string = '';
  public profilo: Profilo = {
    user: this.authHandler.getVoidUser(),
    tweets: [] as Tweet[],
  };

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
      if (this.profiloHandler.profiloPersonale && this.profiloPersonale) {
        this.profilo = this.profiloHandler.profiloPersonale;
        this.caricamentoCompletato();
      } else {
        this.sottoscrizioneProfilo(this.idUtente!);
      }
    } else {
      this.sottoscrizioneProfilo(this.idUtente!);
    }
  }

  private sottoscrizioneProfilo(userId: string): void {
    this.profiloHandler.getProfiloById({
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
      this.profiloHandler.profiloPersonale = data;
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
    this.profiloHandler.deletePubblicazioneById({
      tweetId: tweetId,
      finalizeCall: () => this.loaderService.hide(),
      nextCall: () => {
        this.profilo.tweets = this.profilo.tweets.filter(
          (tweet: Tweet) => tweet.id != tweetId
        );
      },
    });
  }
}
