import { NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniPlayerClass } from './core/class/mini-player.class';
import { StorageClass } from './core/class/storage.class';
import { ChatComponent } from './core/components/chat/chat.component';
import { MiniPlayerComponent } from './core/components/mini-player/mini-player.component';
import { CursorUtilities } from './shared/utilities/cursor.utilities';
import { DataHttp } from './core/api/http.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniPlayerComponent, NgStyle, ChatComponent],
  template: `
    <div
      class="app-router-outlet-container"
      [ngStyle]="{
        'margin-bottom': miniPlayerClass.currentCanzone() ? '8rem' : '0rem'
      }"
    >
      <router-outlet></router-outlet>
    </div>

    <app-chat></app-chat>
    @if (miniPlayerClass.currentCanzone()) {
    <app-mini-player [miniPlayerClass]="miniPlayerClass"> </app-mini-player>
    }
  `,
})
export class AppComponent implements OnInit {
  private cursorUtilities = new CursorUtilities();
  private storageClass = new StorageClass();
  public miniPlayerClass = inject(MiniPlayerClass);

  ngOnInit(): void {
    this.cursorUtilities.setCursoreByStorage();
    DataHttp.loadDataHttp();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(): void {
    this.storageClass.refreshLocalStorage();
    this.storageClass.refreshSessionStorage();
  }
}
