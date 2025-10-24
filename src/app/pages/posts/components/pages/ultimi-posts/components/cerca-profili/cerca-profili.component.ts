import {
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../../environments/environment';
import { DataHttp } from '../../../../../../../core/api/http.data';
import { debounceTimeoutCustom } from '../../../../../../../shared/functions/utilities.function';
import { UserParams } from '../../../../../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-cerca-profili',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cerca-profili.component.html',
  styleUrl: './cerca-profili.component.scss',
})
export class CercaProfiliComponent {
  @Input() searchQuery!: WritableSignal<string>;

  public router = inject(Router);

  private readonly itemsPerPage: number = 3;
  public readonly defaultPic = environment.defaultPic;

  public users = signal<UserParams[]>(DataHttp.users());
  public currentPage = signal<number>(1);
  private debounceQuery = signal<string>('');

  private filteredUsers = computed(() => {
    const users: UserParams[] = this.users();
    const query: string = this.debounceQuery().toLowerCase();

    let filteredUsers: UserParams[] = [];

    if (!query.trim()) {
      filteredUsers = users;
    } else {
      filteredUsers = users.filter(
        (user: UserParams) =>
          user.nome.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
      );
    }

    return filteredUsers;
  });

  public userSlice = computed(() => {
    const filteredUsers: UserParams[] = this.filteredUsers();
    const currentPage: number = this.currentPage();

    const startIndex: number = (currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;

    return filteredUsers.slice(startIndex, endIndex);
  });

  public totalPages = computed(() => {
    return Math.ceil(this.filteredUsers().length / this.itemsPerPage) || 1;
  });

  constructor() {
    const debounced: Function = debounceTimeoutCustom((value: string) => {
      this.debounceQuery.set(value);
      this.currentPage.set(this.totalPages() > 0 ? 1 : 0);
    });

    effect(() => debounced(this.searchQuery()));
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
