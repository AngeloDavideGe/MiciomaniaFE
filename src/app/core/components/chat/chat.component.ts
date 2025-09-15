import { Component, inject, signal } from '@angular/core';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatService } from './services/chat.service';
import { ChatChiusaComponent } from './components/chat-chiusa/chat-chiusa.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatChiusaComponent],
  template: `
    <!-- Chat aperta -->
    @if (chatAperta()) {
    <div
      class="position-fixed bottom-0 end-0 mb-3 me-3"
      style="width: 55vh; height: 65vh; z-index: 1080;"
    >
      <app-chat-list (chiudiChat)="chatAperta.set(false)"> </app-chat-list>
    </div>
    }
    <!-- Chat Chiusa -->
    @else {
    <app-chat-chiusa (apriChat)="chatAperta.set(true)"></app-chat-chiusa>
    }
  `,
})
export class ChatComponent {
  public chatAperta = signal<boolean>(false);
  public chatService = inject(ChatService);
}
