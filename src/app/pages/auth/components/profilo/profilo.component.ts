import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { getProfiloTabs } from './functions/profilo.function';
import { profilo_imports } from './profilo.imports';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { paraMapCustom } from '../../../../../library/functions/router.function';
import { Subject } from 'rxjs';
import { iTab } from '../../../../../library/interfaces/navbar.interface';

interface ProfilePost {
  date: string;
  content: string[];
  likes: number;
  comments: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: profilo_imports,
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfileComponent implements OnInit {
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  public authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Profilo;
  public readonly tabs: iTab[] = getProfiloTabs(this.lang.Tabs);
  public readonly defaultPic = this.appConfig.config.defaultPicsUrl.user;
  public posts = signal<ProfilePost[]>([]);

  public currentTab = signal<string>('text');
  public editProfiloOpen = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );

  public profilo = signal<User | null>(null);

  public isPersonalProfile = computed<boolean>(
    () => this.profilo()?.id === this.currentUser()?.id,
  );

  ngOnInit(): void {
    paraMapCustom({
      route: this.route,
      nameParam: 'id',
      destroy: this.destroy$,
      func: (id: string) => this.loadProfile(id),
    });
  }

  private loadProfile(idUser: string): void {
    const userCaricati = this.authService.currentUsersCaricati;
    const logged: boolean = userCaricati[idUser] || false;
    const cachedUser: User | undefined = this.authService
      .accountsUser()
      .find((user) => user.id === idUser);

    if (logged && cachedUser) {
      this.updateLoadedUser(cachedUser);
      this.profilo.set(cachedUser);
    }

    handlerFunc<User>({
      skipCall: logged,
      callHttp: () => this.authService.getUserById(idUser),
      nextCall: (data: User | null) => {
        if (!data) {
          this.router.navigate(['home']);
          return;
        }

        this.updateLoadedUser(data);
        this.profilo.set(data);
      },
      errorCall: () => (this.authService.currentUsersCaricati[idUser] = false),
    });

    if (this.authService.accountsUser().some((user) => user.id === idUser)) {
      this.authService.currentUsersCaricati[idUser] = true;
    }
  }

  private updateLoadedUser(user: User): void {
    if (user.id === this.authService.currentUser()?.id) {
      this.authService.currentUser.set(user);
    }

    const accountExists = this.authService
      .accountsUser()
      .some((account) => account.id === user.id);

    if (accountExists) {
      this.authService.accountsUser.update((accounts) =>
        accounts.map((account) => (account.id === user.id ? user : account)),
      );
      this.authService.currentUsersCaricati[user.id] = true;
    }
  }

  public openEditProfile(): void {
    if (this.isPersonalProfile()) {
      this.editProfiloOpen.set(true);
    }
  }
}
