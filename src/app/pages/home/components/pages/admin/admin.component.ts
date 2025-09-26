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
import { Ruolo } from '../../../../../shared/enums/users.enum';
import { sottoscrizioneUtenti } from '../../../../../shared/handlers/auth.handler';
import {
  User,
  UserParams,
} from '../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../shared/services/api/auth.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { converUserParams } from '../../../functions/home.functions';
import { AdminService } from './services/admin.service';
import { admin_imports } from './imports/admin.imports';
import { CambioRuoloUtente } from './interfaces/admin.interface';
import {
  AdminLang,
  AdminLangType,
} from './languages/interfaces/admin-lang.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  private loadingService = inject(LoadingService);
  public adminService = inject(AdminService);
  public authService = inject(AuthService);
  public router = inject(Router);

  public user: User | null = null;
  public editAdmin = signal<boolean>(false);
  public userEdit: UserParams = {} as UserParams;
  public ruoli = Object.values(Ruolo);
  public userMap = signal<Record<string, UserParams[]>>({});
  public userMapByRuolo: Record<string, Signal<UserParams[]>> = {};
  public adminLang: AdminLang = {} as AdminLang;

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<AdminLangType>> = {
      it: () => import('./languages/constants/admin-it.constant'),
      en: () => import('./languages/constants/admin-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.adminLang = m.adminLang));
  }

  ngOnInit(): void {
    this.computedUserMapByRuolo();
    this.loadUtenti();
  }

  private computedUserMapByRuolo(): void {
    this.ruoli.forEach((ruolo: Ruolo) => {
      this.userMapByRuolo[ruolo] = computed(() => this.userMap()[ruolo] ?? []);
    });
  }

  private loadUtenti(): void {
    this.user = DataHttp.user();
    const users: UserParams[] = DataHttp.users();

    if (users.length === 0) {
      this.loadingService.show();
      sottoscrizioneUtenti({
        authService: this.authService,
        nextCall: (data) => {
          this.saveUsers(data);
          this.mapUsersByRuolo();
          this.loadingService.hide();
        },
      });
    } else {
      this.mapUsersByRuolo();
    }
  }

  private saveUsers(data: UserParams[]): void {
    DataHttp.users.update(() =>
      data.filter((x: UserParams) => x.id !== this.user?.id)
    );
  }

  private mapUsersByRuolo(): void {
    const users: UserParams[] = DataHttp.users();
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

    this.adminService.updateRuoloUtenteCustom(user.id, Ruolo.USER, () =>
      this.ruoloModificato(userRuolo)
    );
  }

  ruoloModificato(user: CambioRuoloUtente): void {
    const globalUserIndex: number = DataHttp.users().findIndex(
      (u: UserParams) => u.id === user.id
    );
    if (globalUserIndex !== -1) {
      const allUsers: UserParams[] = DataHttp.users();
      allUsers[globalUserIndex].ruolo = user.nuovoRuolo;
      DataHttp.users.set(allUsers);
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/admin']);
    });
  }
}
