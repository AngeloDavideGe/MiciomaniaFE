import {
  AfterViewInit,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataHttp } from './core/api/http.data';
import { ChatComponent } from './core/components/chat/chat.component';
import { ChatService } from './core/components/chat/services/chat.service';
import { MiniPlayerComponent } from './core/components/mini-player/mini-player.component';
import {
  refreshLocalStorage,
  refreshSessionStorage,
} from './core/functions/storage.function';
import { debounceTimeoutCustom } from './shared/functions/utilities.function';
import { MiniPlayerService } from './shared/services/template/mini-player.service';
import { CursorUtilities } from './shared/utilities/class/cursor.utilities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniPlayerComponent, ChatComponent],
  template: `
    <div style="background-color: var(--bg-light);">
      <router-outlet></router-outlet>

      <div [style]="{ height: heigthVoid() }"></div>

      <div class="translate-mobile">
        @if (chatService.chatVisibile()) {
          <app-chat
            [canzoniAperte]="miniPlayerService.currentCanzone"
          ></app-chat>
        }

        @if (miniPlayerService.currentCanzone()) {
          <app-mini-player></app-mini-player>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .translate-mobile {
        @media (max-width: 767.98px) {
          transform: translateY(-4.3rem);
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  public miniPlayerService = inject(MiniPlayerService);
  public chatService = inject(ChatService);

  private cursorUtilities = new CursorUtilities();
  private resize = signal<boolean>(window.innerWidth < 768);

  public heigthVoid = computed<string>(() => {
    let value: number = 4.5;

    if (this.miniPlayerService.currentCanzone()) {
      value += 6;
    }

    if (this.resize()) {
      value += 4;
    }

    return String(value) + 'rem';
  });

  ngOnInit(): void {
    DataHttp.loadDataHttp();
  }

  ngAfterViewInit(): void {
    this.cursorUtilities.setCursoreByStorage();
  }

  @HostListener('window:beforeunload')
  unloadNotification(): void {
    refreshLocalStorage();
    refreshSessionStorage();
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    this.resize.set(window.innerWidth < 768);
  });
}
