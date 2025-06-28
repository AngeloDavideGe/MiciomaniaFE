import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthCustom } from '../../../../../shared/custom/auth-custom.class';
import { LoadingService } from '../../../../../shared/services/loading.service';
import { Ruolo } from '../../../../auth/enums/users.enum';

import {
  User,
  UserParams,
} from '../../../../../shared/interfaces/users.interface';
import { AdminService } from '../../../services/admin.service';
import { admin_imports } from './imports/admin.imports';
import { CambioRuoloUtente } from './interfaces/admin.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: admin_imports,
  templateUrl: './admin.component.html',
})
export class AdminComponent extends AuthCustom implements OnInit, OnDestroy {
  public user: User | null = null;
  public editAdmin = signal<boolean>(false);
  public userEdit: UserParams = {} as UserParams;
  public ruoli = Object.values(Ruolo);
  private destroy$ = new Subject<void>();
  public userMap: WritableSignal<{ [ruolo: string]: UserParams[] }> = signal(
    {}
  );
  public userMapByRuolo: { [ruolo: string]: Signal<UserParams[]> } = {};

  private loadingService = inject(LoadingService);
  public adminService = inject(AdminService);

  ngOnInit(): void {
    this.ruoli.forEach((ruolo) => {
      this.userMapByRuolo[ruolo] = computed(() => this.userMap()[ruolo] ?? []);
    });
    this.loadUtenti();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUtenti(): void {
    {
      this.user = this.authService.user();
      if (this.authService.getUsers.length === 0) {
        this.loadingService.show();
        this.sottoscrizioneUtenti({
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
    let allUsers: UserParams[] = this.authService.getUsers;
    allUsers = data.filter((x) => x.id != this.user?.id);
    this.authService.setMuteUsers = allUsers;
    sessionStorage.setItem('users', JSON.stringify(allUsers));
  }

  private mapUsersByRuolo(): void {
    const users: UserParams[] = this.authService.getUsers;
    const newMap: { [ruolo: string]: UserParams[] } = {};

    this.ruoli.forEach((ruolo) => {
      newMap[ruolo] = [];
    });

    users.forEach((user) => {
      if (!newMap[user.ruolo]) {
        newMap[user.ruolo] = [];
      }
      newMap[user.ruolo].push(user);
    });

    if (this.user) {
      const ruoloUtente = this.user.credenziali.ruolo;
      if (!newMap[ruoloUtente]) {
        newMap[ruoloUtente] = [];
      }
      newMap[ruoloUtente].push(this.converUserParams(this.user));
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
    const globalUserIndex: number = this.authService.getUsers.findIndex(
      (u) => u.id === user.id
    );
    if (globalUserIndex !== -1) {
      const allUsers: UserParams[] = this.authService.getUsers;
      allUsers[globalUserIndex].ruolo = user.nuovoRuolo;
      this.authService.setMuteUsers = allUsers;
      sessionStorage.setItem('users', JSON.stringify(allUsers));
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/admin']);
    });
  }
}
