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
import { PaginazioneIndyComponent } from '../../../../../../../../library/components/pagination/pagination-indy.component';
import { SpinnerIndyComponent } from '../../../../../../../../library/components/spinner/spinner-indy.component';
import { debounceTimeoutCustom } from '../../../../../../../../library/functions/debounce.function';
import { GetFiltriCustom } from '../../../../../../../../library/functions/pagination.function';
import { FiltriInterface } from '../../../../../../../../library/interfaces/pagination.interface';
import { AppConfigService } from '../../../../../../../core/api/appConfig.service';
import { sottoscrizioneUtentiCustom } from '../../../../../../../shared/handlers/auth.handler';
import { UserParams } from '../../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../../shared/services/api/auth.service';

@Component({
  selector: 'app-cerca-profili',
  standalone: true,
  imports: [FormsModule, SpinnerIndyComponent, PaginazioneIndyComponent],
  templateUrl: './cerca-profili.component.html',
  styleUrl: './cerca-profili.component.scss',
})
export class CercaProfiliComponent implements OnInit {
  @Input() searchQuery!: WritableSignal<string>;

  public router = inject(Router);
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  private readonly itemsPerPage: number = 5;
  public readonly defaultPic = this.appConfig.config.defaultPicsUrl.user;
  public filtri: FiltriInterface<UserParams> = {} as any;

  private debounceQuery = signal<string>('');

  public users = computed<UserParams[]>(() => {
    this.setFiltri();
    return this.authService.users();
  });

  constructor() {
    const debounced: Function = debounceTimeoutCustom((value: string) => {
      this.debounceQuery.set(value);
      this.filtri.currentPage.set(this.filtri.totalPage() > 0 ? 1 : 0);
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
    this.filtri = GetFiltriCustom<UserParams, null>({
      elemTable: this.users,
      elemForPage: signal<number>(this.itemsPerPage),
      select: [
        {
          key: 'id',
          query: this.debounceQuery,
        },
        {
          key: 'nome',
          query: this.debounceQuery,
        },
      ],
    });
  }
}
