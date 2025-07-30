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
import { sottoscrizioneUtenti } from '../../../../../shared/handlers/auth.handler';
import {
  User,
  UserParams,
} from '../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../shared/services/api/auth.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { Ruolo } from '../../../../auth/enums/users.enum';
import { converUserParams } from '../../../functions/home.functions';
import { AdminService } from '../../../services/admin.service';
import { admin_imports } from './imports/admin.imports';
import { CambioRuoloUtente } from './interfaces/admin.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  public user: User | null = null;
  public editAdmin = signal<boolean>(false);
  public userEdit: UserParams = {} as UserParams;
  public ruoli = Object.values(Ruolo);
  public userMap = signal<{ [ruolo: string]: UserParams[] }>({});
  public userMapByRuolo: { [ruolo: string]: Signal<UserParams[]> } = {};

  private loadingService = inject(LoadingService);
  public adminService = inject(AdminService);
  public authService = inject(AuthService);
  public router = inject(Router);

  ngOnInit(): void {
    this.ruoli.forEach((ruolo) => {
      this.userMapByRuolo[ruolo] = computed(() => this.userMap()[ruolo] ?? []);
    });
    this.loadUtenti();
  }

  private loadUtenti(): void {
    {
      this.user = DataHttp.user();
      if (DataHttp.users().length === 0) {
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
  }

  private saveUsers(data: UserParams[]): void {
    DataHttp.users.update(() => data.filter((x) => x.id !== this.user?.id));
  }

  private mapUsersByRuolo(): void {
    const users: UserParams[] = DataHttp.users();
    const newMap: { [ruolo: string]: UserParams[] } = {};

    this.ruoli.forEach((ruolo) => (newMap[ruolo] = []));
    users.forEach((user) => newMap[user.ruolo].push(user));

    if (this.user) {
      const ruoloUtente: Ruolo = this.user.credenziali.ruolo;
      if (!newMap[ruoloUtente]) {
        newMap[ruoloUtente] = [];
      }
      newMap[ruoloUtente].push(converUserParams(this.user));
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
      (u) => u.id === user.id
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
