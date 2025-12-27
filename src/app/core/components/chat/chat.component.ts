import { Component, inject, Input, signal } from '@angular/core';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatService } from './services/chat.service';
import { ChatChiusaComponent } from './components/chat-chiusa/chat-chiusa.component';
import { NgClass } from '@angular/common';
import { MangaSong } from '../../../shared/interfaces/elementiUtente.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatChiusaComponent, NgClass],
  template: `
    @if (chatAperta()) {
    <div
      class="position-fixed end-0 me-3 chat-wrapper"
      [ngClass]="{ 'chat-spostata': canzoniAperte() !== null }"
      style="width: 55vh; z-index: 1080;"
    >
      <app-chat-list (chiudiChat)="chatAperta.set(false)"></app-chat-list>
    </div>
    } @else {
    <div
      class="position-fixed end-0 me-3 chat-wrapper"
      [ngClass]="{ 'chat-spostata': canzoniAperte() !== null }"
      style="z-index: 1080;"
    >
      <app-chat-chiusa (apriChat)="chatAperta.set(true)"></app-chat-chiusa>
    </div>
    }
  `,
  styles: [
    `
      .chat-wrapper {
        bottom: 0;
        margin-bottom: 1rem;
      }

      .chat-spostata {
        bottom: 8rem;
      }
    `,
  ],
})
export class ChatComponent {
  public chatAperta = signal<boolean>(false);
  public chatService = inject(ChatService);

  @Input() canzoniAperte = signal<MangaSong | null>(null);
}
