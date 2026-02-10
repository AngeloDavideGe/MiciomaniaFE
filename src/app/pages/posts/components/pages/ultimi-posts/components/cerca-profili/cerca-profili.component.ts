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
import { SpinnerComponent } from '../../../../../../../shared/components/dialogs/spinner.component';
import {
  FiltriInterface,
  GetFiltriCustom,
} from '../../../../../../../shared/utilities/pagination.utilities';
import { PaginazioneCustomComponent } from '../../../../../../../shared/components/custom/pagination.component';

@Component({
  selector: 'app-cerca-profili',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, PaginazioneCustomComponent],
  templateUrl: './cerca-profili.component.html',
  styleUrl: './cerca-profili.component.scss',
})
export class CercaProfiliComponent implements OnInit {
  @Input() searchQuery!: WritableSignal<string>;

  public router = inject(Router);
  private authService = inject(AuthService);

  private readonly itemsPerPage: number = 5;
  public readonly defaultPic = environment.defaultPicsUrl.user;
  public filtri: FiltriInterface<UserParams> = {} as any;

  public currentPage = signal<number>(1);
  private debounceQuery = signal<string>('');

  public users = computed<UserParams[]>(() => {
    this.setFiltri();
    return this.authService.users();
  });

  constructor() {
    const debounced: Function = debounceTimeoutCustom((value: string) => {
      this.debounceQuery.set(value);
      this.currentPage.set(this.filtri.totalPage() > 0 ? 1 : 0);
    });

    effect(() => debounced(this.searchQuery()));
  }

  ngOnInit(): void {
    sottoscrizioneUtentiCustom({
      authService: this.authService,
      nextCall: () => {},
    });

    this.setFiltri();
  }

  private setFiltri(): void {
    this.filtri = GetFiltriCustom(
      this.users,
      this.itemsPerPage,
      this.currentPage,
      [
        {
          key: 'id',
          query: this.debounceQuery,
        },
        {
          key: 'nome',
          query: this.debounceQuery,
        },
      ],
    );
  }
}
