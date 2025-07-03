import { NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniPlayerClass } from './core/class/mini-player.class';
import { ChatComponent } from './core/components/chat/chat.component';
import { MiniPlayerComponent } from './core/components/mini-player/mini-player.component';
import { CursorUtilities } from './shared/utilities/cursor.utilities';

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
  private cursorUtilities = new CursorUtilities();
  public miniPlayerClass = inject(MiniPlayerClass);

  ngOnInit(): void {
    this.cursorUtilities.setCursoreByStorage();
  }
}
