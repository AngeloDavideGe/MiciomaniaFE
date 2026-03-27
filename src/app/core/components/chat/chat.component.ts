import { NgStyle } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  Input,
  signal,
} from '@angular/core';
import { debounceTimeoutCustom } from '../../../shared/functions/utilities.function';
import { MangaSong } from '../../../shared/interfaces/elementiUtente.interface';
import { ChatChiusaComponent } from './components/chat-chiusa/chat-chiusa.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatListComponent, ChatChiusaComponent, NgStyle],
  template: `
    <div
      class="position-fixed end-0 me-1"
      style="z-index: 100;"
      [ngStyle]="{ bottom: bottomValue }"
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
  @Input() bottomValue!: string;
}
