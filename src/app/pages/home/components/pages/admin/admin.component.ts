import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataHttp } from '../../../../../core/api/http.data';
import { PulsantiHeader } from '../../../../../shared/components/custom/header-custom.component';
import { Ruolo } from '../../../../../shared/enums/users.enum';
import { sottoscrizioneUtentiCustom } from '../../../../../shared/handlers/auth.handler';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import {
  User,
  UserParams,
} from '../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../shared/services/api/auth.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { converUserParams } from '../../../functions/home.functions';
import { updateRuoloUtenteCustom } from './handlers/admin.handler';
import { admin_imports } from './imports/admin.imports';
import { CambioRuoloUtente } from './interfaces/admin.interface';
import {
  AdminLang,
  AdminLangType,
} from './languages/interfaces/admin-lang.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  private loadingService = inject(LoadingService);
  public authService = inject(AuthService);
  public router = inject(Router);

  public user: User | null = DataHttp.user();
  public editAdmin = signal<boolean>(false);
  public loadedAdmin = signal<boolean>(false);
  public userEdit: UserParams = {} as UserParams;
  public ruoli = Object.values(Ruolo);
  public userMap = signal<Record<string, UserParams[]>>({});
  public userMapByRuolo: Record<string, Signal<UserParams[]>> = {};
  public adminLang: AdminLang = {} as AdminLang;
  public pulsantiHeader: PulsantiHeader[] = [
    {
      click: () => this.router.navigate(['/home']),
      disabled: false,
      titolo: {
        it: 'Torna alla Home',
        en: 'Go to Home',
      },
      icona: 'bi bi-house-door me-2',
    },
  ];

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<AdminLangType>> = {
      it: () => import('./languages/constants/admin-it.constant'),
      en: () => import('./languages/constants/admin-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.adminLang = m.adminLang));
  }

  ngOnInit(): void {
    this.loadUtenti();

    this.ruoli.forEach((ruolo: Ruolo) => {
      this.userMapByRuolo[ruolo] = computed<UserParams[]>(
        () => this.userMap()[ruolo] ?? [],
      );
    });
  }

  private loadUtenti(): void {
    const users: UserParams[] = this.authService.users();
    users.length == 0 ? this.loadingService.show() : null;

    sottoscrizioneUtentiCustom({
      authService: this.authService,
      nextCall: () => this.mapUsersByRuolo(),
    });
  }

  private mapUsersByRuolo(): void {
    const users: UserParams[] = this.authService.users();
    const newMap: Record<string, UserParams[]> = Object.create(null);

    this.ruoli.forEach((ruolo: Ruolo) => (newMap[ruolo] = []));
    users.forEach((user: UserParams) => newMap[user.ruolo].push(user));

    if (this.user) {
      const ruoloUtente: Ruolo = this.user.credenziali.ruolo;
      const userConverted: UserParams = converUserParams(this.user);

      if (newMap[ruoloUtente]) {
        newMap[ruoloUtente].push(userConverted);
      } else {
        newMap[ruoloUtente] = [userConverted];
      }
    }

    this.userMap.set(newMap);
    this.loadedAdmin.set(true);
    this.loadingService.hide();
  }

  modificaRuolo(user: UserParams): void {
    this.userEdit = user;
    this.editAdmin.set(true);
  }

  eliminaRuolo(user: UserParams): void {
    const userRuolo: CambioRuoloUtente = {
      id: user.id,
      vecchioRuolo: user.ruolo,
      nuovoRuolo: Ruolo.USER,
    };

    updateRuoloUtenteCustom({
      authService: this.authService,
      loadingService: this.loadingService,
      userId: user.id,
      ruolo: Ruolo.USER,
      nextCall: () => this.ruoloModificato(userRuolo),
    });
  }

  ruoloModificato(user: CambioRuoloUtente): void {
    const globalUserIndex: number = this.authService
      .users()
      .findIndex((u: UserParams) => u.id === user.id);
    if (globalUserIndex !== -1) {
      const allUsers: UserParams[] = this.authService.users();
      allUsers[globalUserIndex].ruolo = user.nuovoRuolo;
      this.authService.users.set(allUsers);
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/admin']);
    });
  }
}
