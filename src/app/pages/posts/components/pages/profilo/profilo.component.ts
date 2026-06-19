import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { iTab } from '../../../../../../library/components/tabs/tabs.component';
import { ConfirmService } from '../../../../../../library/dialogs/confirm.service';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { RecordStruttura } from '../../../../../../library/interfaces/form.interface';
import { TornaIndietro } from '../../../../../../library/interfaces/navbar.interface';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
import { DataHttp } from '../../../../../core/api/http.data';
import { uploadImage } from '../../../../../shared/functions/upload-pic.function';
import {
  getVoidUser,
  updateUserCustom,
} from '../../../../../shared/handlers/auth.handler';
import { Profilo } from '../../../../../shared/interfaces/http.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../shared/services/api/auth.service';
import { mapToProfilo } from '../../../../home/functions/profilo.function';
import { PostService } from '../../../services/post.service';
import { Tweet } from '../../shared/post.interface';
import { profilo_imports } from './profilo.imports';
import {
  EditableSocial,
  modaleApertaType,
} from './interfaces/profilo.interface';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: profilo_imports,
  templateUrl: './profilo.component.html',
})
export class ProfiloComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);
  public router = inject(Router);
  public postService = inject(PostService);
  private confirmService = inject(ConfirmService);

  private destroy$ = new Subject<void>();
  private idUtente: string | null = null;
  public profiloPersonale: boolean = false;
  public utenteCaricato = signal<boolean>(false);
  public newProfilePic = signal<File | null>(null);
  public modaleAperta: modaleApertaType = '';
  public socialArray: EditableSocial[] = [];
  public tornaIndietroPath: TornaIndietro = {} as TornaIndietro;

  public profilo: Profilo = {
    user: getVoidUser(),
    tweets: [] as Tweet[],
  };

  public tabs: iTab[] = [
    {
      id: 'info',
      label: 'Info',
      color: 'red',
    },
    {
      id: 'social',
      label: 'Social',
      color: 'blue',
    },
  ];

  public newTweetForm: RecordStruttura = {
    tweet: {
      titolo: 'Immagine',
      tipo: 'File',
      validators: [],
      file: {
        previewUrl: null,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/pjpeg'],
        accept: 'image/*',
      },
    },
    descrizione: {
      titolo: 'Descrizione',
      validators: [Validators.required],
      errorMessage: '',
      tipo: 'Textarea',
    },
  };

  public changePicForm: RecordStruttura = {
    imgProfilo: {
      titolo: 'Modifica Immagine',
      validators: [Validators.required],
      tipo: 'File',
      errorMessage: 'Immagine obbligatoria (jpg, jpeg o png)',
      file: {
        previewUrl: null,
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        allowedTypes: ['image/jpeg', 'image/png', 'image/pjpeg'],
        accept: 'image/*',
      },
    },
  };

  constructor() {
    this.sottoscrizioneParam();
    this.setTornaIndietroPath();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setTornaIndietroPath(): void {
    const state = history.state?.['message'];
    switch (state) {
      case 'TableUserParams':
        this.tornaIndietroPath = {
          path: '/home/admin',
          title: 'Torna a Admin',
        };
        break;
      case 'CercaProfili':
        this.tornaIndietroPath = {
          path: '/posts/ultimi-post',
          title: 'torna a Ultimi Post',
        };
        break;
      default:
        this.tornaIndietroPath = {
          path: '/home',
          title: 'Torna alla Home',
        };
        break;
    }
  }

  private sottoscrizioneParam(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.idUtente = params['id'];
        const user: User | null = DataHttp.user();
        this.caricaDatiUser(user);
      });
  }

  private caricaDatiUser(user: User | null): void {
    this.profiloPersonale = this.idUtente == user?.id;

    if (this.profiloPersonale) {
      if (DataHttp.profiloPersonale) {
        this.profilo = DataHttp.profiloPersonale;
        this.caricamentoCompletato();
      } else {
        this.sottoscrizioneProfilo(this.idUtente!);
      }
    } else {
      this.sottoscrizioneProfilo(this.idUtente!);
    }
  }

  private sottoscrizioneProfilo(userId: string): void {
    handlerFunc<Profilo>({
      callHttp: () => this.postService.getProfiloById(userId),
      mapCall: (valueDb: any) => mapToProfilo(valueDb),
      nextCall: (data: Profilo) => {
        this.setLocalStorage(data);
        this.caricamentoCompletato();
      },
    });
  }

  private caricamentoCompletato(): void {
    this.loadSocial();
    this.utenteCaricato.set(true);
  }

  private setLocalStorage(data: Profilo): void {
    this.profilo = data;
    if (this.profiloPersonale) {
      DataHttp.profiloPersonale = data;
    }
  }

  loadSocial(): void {
    this.socialArray = Object.entries(
      this.profilo.user.profile.social || {},
    ).map(([key, link]) => ({
      key,
      link,
    }));
  }

  eliminaTweet(tweetId: number): void {
    this.confirmService.confirmCustom({
      titolo: 'Elimina Tweet',
      messaggio: 'Sei sicuro di voler eliminare questo tweet?',
      buttonNo: 'Annulla',
      buttonSi: 'Conferma',
      confirmFunc: () => this.confirmEliminaTweet(tweetId),
      notConfirmFunc: () => {},
    });
  }

  private confirmEliminaTweet(tweetId: number): void {
    handlerFunc<void>({
      callHttp: () => this.postService.deletePubblicazioni(tweetId),
      nextCall: () =>
        (this.profilo.tweets = this.profilo.tweets.filter(
          (tweet: Tweet) => tweet.id != tweetId,
        )),
    });
  }

  onUpload(file: File | null): void {
    const user = structuredClone(DataHttp.user()) || ({} as User);
    this.postService.aggiornamentoPic.set(true);
    this.modaleAperta = '';

    uploadImage<User>({
      appConfig: this.appConfig,
      file: file as File,
      id: user.id,
      nameStorage: 'ProfilePic',
      switchMapCall: (url: string) => {
        return updateUserCustom({
          authService: this.authService,
          user: {
            ...user,
            credenziali: { ...user.credenziali, profilePic: url },
          },
          finalizeFunc: () => {
            this.postService.aggiornamentoPic.set(false);
            this.newProfilePic.set(null);
          },
          valueContext: false,
        });
      },
    }).subscribe({
      next: (user: User) => (DataHttp.profiloPersonale!.user = user),
      error: (err: Error) => console.error('Errore chiamata:', err),
    });
  }

  inviaTweet(event: any): void {
    const tweet: Tweet = {
      id: 0,
      dataCreazione: new Date(),
      testo: event.descrizione,
      idUtente: this.idUtente!,
      immaginePost: '',
    };

    handlerFunc<Tweet>({
      callHttp: () => this.postService.postPubblicazioni(tweet),
      nextCall: () => DataHttp.profiloPersonale?.tweets.unshift(tweet),
    });

    this.modaleAperta = '';
  }
}
