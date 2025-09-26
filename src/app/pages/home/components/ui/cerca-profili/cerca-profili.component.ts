import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DataHttp } from '../../../../../core/api/http.data';
import { UserParams } from '../../../../../shared/interfaces/users.interface';
import { HomeLang } from '../../../languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-cerca-profili',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cerca-profili.component.html',
  styleUrl: './cerca-profili.component.scss',
})
export class CercaProfiliComponent implements OnInit, OnDestroy {
  private itemsPerPage: number = 5;
  public currentPage: number = 1;
  public totalPages: number = 0;
  public filteredUsers: UserParams[] = [];
  public userSlice = signal<UserParams[]>([]);
  public searchQuery: string = '';
  public searchQuery$ = new Subject<string>();
  private destroy$ = new Subject<void>();
  public users: UserParams[] = DataHttp.users();

  @Input() homeLang!: HomeLang;
  @Output() goToProfilo = new EventEmitter<string>();
  @Output() chiudiComponente = new EventEmitter<void>();

  ngOnInit(): void {
    this.filteredUsers = structuredClone(DataHttp.users());
    this.setUserSlice();
    this.sottoscrizioneFiltroUtenti();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sottoscrizioneFiltroUtenti(): void {
    this.searchQuery$
      .pipe(takeUntil(this.destroy$), debounceTime(100))
      .subscribe((searchQuery) => this.applicaFiltroUtenti(searchQuery));
  }

  private applicaFiltroUtenti(searchQuery: string): void {
    this.filteredUsers = DataHttp.users().filter((user: UserParams) => {
      const nome: string = user.nome ? user.nome.toLowerCase() : '';
      const query: string = searchQuery.toLowerCase();
      return nome.includes(query);
    });

    this.setUserSlice();
  }

  editFiltro(value: string): void {
    this.searchQuery$.next(value);
    this.searchQuery = value;
  }

  clearSearch(): void {
    if (this.searchQuery) {
      this.editFiltro('');
      this.filteredUsers = structuredClone(DataHttp.users());
      this.setUserSlice();
    }
  }

  private setUserSlice(): void {
    this.userSlice.set(this.filteredUsers.slice(0, this.itemsPerPage));
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = this.totalPages > 0 ? 1 : 0;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedUsers();
    }
  }

  private setPaginatedUsers(): void {
    const startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex: number = startIndex + this.itemsPerPage;
    this.userSlice.set(this.filteredUsers.slice(startIndex, endIndex));
  }
}
