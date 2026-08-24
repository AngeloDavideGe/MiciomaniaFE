import { ActivatedRoute, Router } from '@angular/router';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { iTab } from '../../../../../library/interfaces/tabs.interface';
import { profilo_imports } from './profilo.imports';
import { getProfiloTabs } from './functions/profilo.function';
import { User, UserToken } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { handlerFunc } from '../../../../../library/functions/handler.function';

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

  public readonly tabs: iTab[] = getProfiloTabs();

  public currentTab = signal<string>('text');
  public editProfiloOpen = signal<boolean>(false);
  public profileId = signal<string>('');

  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );

  public profilo = signal<User>({} as User);

  public isPersonalProfile = computed<boolean>(
    () => this.profileId() === this.currentUser()?.id,
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idUser: string = params.get('id') ?? '';
      this.profileId.set(idUser);
      this.loadProfile(idUser);
    });
  }

  private loadProfile(idUser: string): void {
    if (!idUser) {
      this.profilo.set({} as User);
      return;
    }

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
      nextCall: (data: User) => {
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

  public readonly posts: ProfilePost[] = [
    {
      date: '12 Maggio 2024 · 21:30',
      content: [
        'Oggi ho finito un manga che mi ha lasciato senza parole.',
        'A volte le storie sanno davvero arrivare dritte al cuore.',
        'Consigli?',
      ],
      likes: 24,
      comments: 8,
    },
    {
      date: '9 Maggio 2024 · 18:12',
      content: [
        'Nuova playlist in arrivo!',
        'Se avete qualche brano da suggerire, drop pazzo nei commenti 🎧',
      ],
      likes: 18,
      comments: 6,
    },
    {
      date: '3 Maggio 2024 · 14:45',
      content: [
        'Giornatona produttiva:',
        'Allenamento',
        'Studio',
        'Gaming serale con gli amici',
        'La combo perfetta non esiste... o forse sì? 😎',
      ],
      likes: 31,
      comments: 12,
    },
  ];
}
