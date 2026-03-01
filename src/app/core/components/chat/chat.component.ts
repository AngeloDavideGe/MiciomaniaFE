import { NgStyle } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MangaSong } from '../../../shared/interfaces/elementiUtente.interface';
import { ChatChiusaComponent } from './components/chat-chiusa/chat-chiusa.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatChiusaComponent, NgStyle],
  template: `
    <!-- classe bootstrap che fa tipo right: 1 rem-->
    <div
      class="position-fixed end-0 me-1"
      [ngStyle]="{ bottom: canzoniAperte() !== null ? '6.5rem' : '0.5rem' }"
    >
      @if (chatAperta()) {
        <app-chat-list (chiudiChat)="chatAperta.set(false)"></app-chat-list>
      } @else {
        <app-chat-chiusa (apriChat)="chatAperta.set(true)"></app-chat-chiusa>
      }
    </div>
  `,
})
export class ChatComponent {
  public chatAperta = signal<boolean>(false);
  @Input() canzoniAperte = signal<MangaSong | null>(null);
}
