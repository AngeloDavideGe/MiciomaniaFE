import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  public editAdmin: boolean = false;
  public userEdit: UserParams = {} as UserParams;
  public ruoli = Object.values(Ruolo);
  private destroy$ = new Subject<void>();
  public userMap: { [ruolo: string]: UserParams[] } = {};

  private loadingService = inject(LoadingService);
  public adminService = inject(AdminService);

  ngOnInit(): void {
    this.loadUtenti();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUtenti(): void {
    this.sottoscrizioneUtente({
      userFunc: (user) => {
        this.user = user;
        if (this.authService.users.length === 0) {
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
      },
      destroy$: this.destroy$,
    });
  }

  private saveUsers(data: UserParams[]): void {
    this.authService.users = data.filter((x) => x.id != this.user?.id);
    sessionStorage.setItem('users', JSON.stringify(this.authService.users));
  }

  private mapUsersByRuolo(): void {
    const users: UserParams[] = this.authService.users;

    this.ruoli.forEach((ruolo) => {
      this.userMap[ruolo] = [];
    });

    users.forEach((user) => {
      this.userMap[user.ruolo].push(user);
    });

    if (this.user) {
      this.userMap[this.user.credenziali.ruolo].push(
        this.converUserParams(this.user)
      );
    }
  }

  modificaRuolo(user: UserParams): void {
    this.userEdit = user;
    this.editAdmin = true;
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
    const globalUserIndex: number = this.authService.users.findIndex(
      (u) => u.id === user.id
    );
    if (globalUserIndex !== -1) {
      this.authService.users[globalUserIndex].ruolo = user.nuovoRuolo;
      sessionStorage.setItem('users', JSON.stringify(this.authService.users));
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/admin']);
    });
  }
}
