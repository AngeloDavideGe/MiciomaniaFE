import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorClass } from './shared/class/cursor.class';
import { NotificheClass } from './shared/class/notifiche.class';
import { MiniPlayerComponent } from './core/components/mini-player.component';

import { NgIf, NgStyle } from '@angular/common';
import { MiniPlayerClass } from './core/class/mini-player.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MiniPlayerComponent, NgIf, NgStyle],
  template: `
    <div
      class="router-outlet-container"
      [ngStyle]="{
        'margin-bottom': miniPlayerClass.currentCanzone ? '8rem' : '0'
      }"
    >
      <router-outlet></router-outlet>
    </div>

    <app-mini-player
      *ngIf="miniPlayerClass.currentCanzone"
      [miniPlayerClass]="miniPlayerClass"
    >
    </app-mini-player>
  `,
  styles: [
    `
      .router-outlet-container {
        background-image: url('https://png.pngtree.com/thumb_back/fw800/background/20200322/pngtree-elegant-white-background-with-shiny-image_332367.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
        padding: 1rem;
        font-family: 'Arial', sans-serif;
      }
    `,
  ],
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
