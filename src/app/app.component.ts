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
import { MiniPlayerService } from './shared/services/template/mini-player.service';
import { CursorUtilities } from './shared/utilities/class/cursor.utilities';
import { debounceTimeoutCustom } from './shared/functions/utilities.function';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniPlayerComponent, ChatComponent],
  template: `
    <div style="background-color: var(--bg-light);">
      <router-outlet></router-outlet>

      <div [style]="{ height: bottomArray()[0] }"></div>

      @if (chatService.chatVisibile()) {
        <app-chat [bottomValue]="bottomArray()[1]"></app-chat>
      }

      @if (miniPlayerService.currentCanzone()) {
        <app-mini-player></app-mini-player>
      }
    </div>
  `,
  styles: [``],
})
export class AppComponent implements OnInit, AfterViewInit {
  public miniPlayerService = inject(MiniPlayerService);
  public chatService = inject(ChatService);

  private cursorUtilities = new CursorUtilities();
  public resize = signal<boolean>(false);

  public bottomArray = computed<string[]>(() => {
    if (this.resize()) return ['8.5rem', '5rem'];
    else if (this.miniPlayerService.currentCanzone())
      return ['10.5rem', '6.5rem'];
    else return ['4.5rem', '0.5rem'];
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
