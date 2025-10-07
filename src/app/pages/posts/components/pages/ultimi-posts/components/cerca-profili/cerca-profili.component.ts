import {
  Component,
  computed,
  EventEmitter,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataHttp } from '../../../../../../../core/api/http.data';
import { effectTimeoutCustom } from '../../../../../../../shared/functions/utilities.function';
import { UserParams } from '../../../../../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-cerca-profili',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cerca-profili.component.html',
  styleUrl: './cerca-profili.component.scss',
})
export class CercaProfiliComponent {
  @Output() goToProfilo = new EventEmitter<string>();
  @Output() chiudiComponente = new EventEmitter<void>();

  private readonly itemsPerPage: number = 1;
  public users = signal<UserParams[]>(DataHttp.users());

  public totalPages: WritableSignal<number> = signal(1);
  public currentPage: WritableSignal<number> = signal(1);
  public searchQuery: WritableSignal<string> = signal('');
  private debounceQuery: WritableSignal<string> = signal('');

  private filteredUsers: Signal<UserParams[]> = computed(() => {
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

    this.totalPages.set(Math.ceil(filteredUsers.length / this.itemsPerPage));

    return filteredUsers;
  });

  public userSlice: Signal<UserParams[]> = computed(() => {
    const filteredUsers: UserParams[] = this.filteredUsers();
    const currentPage: number = this.currentPage();

    const startIndex: number = (currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;

    return filteredUsers.slice(startIndex, endIndex);
  });

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) => {
      this.debounceQuery.set(value);
      this.currentPage.set(this.totalPages() > 0 ? 1 : 0);
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
