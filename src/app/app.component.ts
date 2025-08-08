import { NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataHttp } from './core/api/http.data';
import { ChatComponent } from './core/components/chat/chat.component';
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
  imports: [RouterOutlet, MiniPlayerComponent, NgStyle, ChatComponent],
  template: `
    <div class="app-router-outlet-container">
      <!-- Componenti delle rotte -->
      <router-outlet></router-outlet>
      <!-- Spacer per il mini-player -->
      <div
        [ngStyle]="{
          height: miniPlayerService.currentCanzone() ? '13rem' : '5rem'
        }"
      ></div>
    </div>

    <app-chat></app-chat>
    @if (miniPlayerService.currentCanzone()) {
    <app-mini-player> </app-mini-player>
    }
  `,
})
export class AppComponent implements OnInit {
  private cursorUtilities = new CursorUtilities();
  public miniPlayerService = inject(MiniPlayerService);

  ngOnInit(): void {
    this.cursorUtilities.setCursoreByStorage();
    DataHttp.loadDataHttp();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(): void {
    refreshLocalStorage();
    refreshSessionStorage();
  }
}
