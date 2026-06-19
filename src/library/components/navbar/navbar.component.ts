import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MiniPlayerService } from '../../../app/shared/services/template/mini-player.service';
import { ChatService } from '../../../app/core/components/chat/services/chat.service';
import { NavBarButton, TornaIndietro } from '../../interfaces/navbar.interface';
import { DataHttp } from '../../../app/core/api/http.data';
import { defaultSongPic } from '../../constants/lib.constant';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class CustomNavBarComponent {
  public miniPlayerService = inject(MiniPlayerService);
  public chatService = inject(ChatService);

  public router = inject(Router);
  public filterActive = signal<boolean>(false);
  public searchValue = '';
  public readonly defaultPic: string = defaultSongPic;

  @Input() filtro: boolean = false;
  @Input() altriBottoni: NavBarButton[] = [];
  @Input() selected = signal<string>('');
  @Input() tornaIndietro: TornaIndietro | null = null;
  @Input() viewTornaIndietro: boolean = true;

  @Output() filtroChanged = new EventEmitter<string>();
  @Output() toggleFilter = new EventEmitter<void>();

  public goHomeButton = computed<TornaIndietro>(
    () =>
      this.tornaIndietro || {
        title: 'Torna alla Home',
        path: '/home',
      },
  );

  public onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.filtroChanged.emit(value);
  }

  public clearSearch(): void {
    this.searchValue = '';
    this.filtroChanged.emit('');
  }

  public toggleFilters(): void {
    this.filterActive.update((active: boolean) => !active);
    this.toggleFilter.emit();
  }
}
