import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  OnInit,
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
import { MiniPlayerService } from './shared/services/template/mini-player.service';
import { CursorUtilities } from './shared/utilities/cursor.utilities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniPlayerComponent, ChatComponent],
  template: `
    <div class="all-component">
      <!-- Componenti delle rotte -->
      <router-outlet></router-outlet>

      <!-- Spaczio Vuoto-->
      <div
        [style]="{
          height: miniPlayerService.currentCanzone() ? '13rem' : '5rem',
        }"
      ></div>

      <!-- Chat -->
      @if (chatService.chatVisibile()) {
        <app-chat [canzoniAperte]="miniPlayerService.currentCanzone"></app-chat>
      }

      <!-- Mini Player -->
      @if (miniPlayerService.currentCanzone()) {
        <app-mini-player></app-mini-player>
      }
    </div>
  `,
  styles: [
    `
      .all-component {
        background-color: var(--bg-background-color);
      }
    `,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  private cursorUtilities = new CursorUtilities();
  public miniPlayerService = inject(MiniPlayerService);
  public chatService = inject(ChatService);

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
}
