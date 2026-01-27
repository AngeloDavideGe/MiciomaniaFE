import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../../environments/environment';
import { debounceTimeoutCustom } from '../../../../../../../shared/functions/utilities.function';
import { sottoscrizioneUtentiCustom } from '../../../../../../../shared/handlers/auth.handler';
import { UserParams } from '../../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../../shared/services/api/auth.service';

@Component({
  selector: 'app-cerca-profili',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cerca-profili.component.html',
  styleUrl: './cerca-profili.component.scss',
})
export class CercaProfiliComponent implements OnInit {
  @Input() searchQuery!: WritableSignal<string>;

  public router = inject(Router);
  private authService = inject(AuthService);

  private readonly itemsPerPage: number = 3;
  public readonly defaultPic = environment.defaultPicsUrl.user;

  public currentPage = signal<number>(1);
  private debounceQuery = signal<string>('');

  public users = computed<UserParams[]>(() => this.authService.users());

  private filteredUsers = computed<UserParams[]>(() => {
    const users: UserParams[] = this.users();
    const query: string = this.debounceQuery().toLowerCase();

    let filteredUsers: UserParams[] = [];

    if (!query.trim()) {
      filteredUsers = users;
    } else {
      filteredUsers = users.filter(
        (user: UserParams) =>
          user.nome.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query),
      );
    }

    return filteredUsers;
  });

  public userSlice = computed<UserParams[]>(() => {
    const filteredUsers: UserParams[] = this.filteredUsers();
    const currentPage: number = this.currentPage();

    const startIndex: number = (currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;

    return filteredUsers.slice(startIndex, endIndex);
  });

  public totalPages = computed<number>(() => {
    return Math.ceil(this.filteredUsers().length / this.itemsPerPage) || 1;
  });

  constructor() {
    const debounced: Function = debounceTimeoutCustom((value: string) => {
      this.debounceQuery.set(value);
      this.currentPage.set(this.totalPages() > 0 ? 1 : 0);
    });

    effect(() => debounced(this.searchQuery()));
  }

  ngOnInit(): void {
    sottoscrizioneUtentiCustom({
      authService: this.authService,
      nextCall: () => {},
    });
  }

  clearSearch(): void {
    if (this.searchQuery()) {
      this.searchQuery.set('');
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((x: number) => x + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((x: number) => x - 1);
    }
  }
}
