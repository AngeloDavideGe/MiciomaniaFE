import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorClass } from './shared/class/cursor.class';
import { NotificheClass } from './shared/class/notifiche.class';
import { MiniPlayerComponent } from './core/components/mini-player/mini-player.component';
import { NgIf, NgStyle } from '@angular/common';
import { MiniPlayerClass } from './core/class/mini-player.class';
import { ChatComponent } from './core/components/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniPlayerComponent, NgIf, NgStyle, ChatComponent],
  template: `
    <div
      class="app-router-outlet-container"
      [ngStyle]="{
        'margin-bottom': miniPlayerClass.currentCanzone() ? '8rem' : '0'
      }"
    >
      <router-outlet></router-outlet>
    </div>

    <app-chat></app-chat>
    <app-mini-player
      *ngIf="miniPlayerClass.currentCanzone()"
      [miniPlayerClass]="miniPlayerClass"
    >
    </app-mini-player>
  `,
})
export class AppComponent implements OnInit {
  private cursorClass = new CursorClass();
  private notificheClass = new NotificheClass();
  public miniPlayerClass = inject(MiniPlayerClass);

  ngOnInit(): void {
    this.cursorClass.setCursoreByStorage();
    this.notificheClass.sottoscrizioneNotifiche();
  }
}
