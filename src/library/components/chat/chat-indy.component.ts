import { NgStyle } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Gruppo, LastMess, Messaggio } from '../../interfaces/chat.interface';
import { ChatAllComponent } from './components/chat-all/chat-all.component';
import { ChatGroupComponent } from './components/chat-group/chat-group.component';

@Component({
  selector: 'app-chat-indy',
  standalone: true,
  imports: [NgStyle, ChatAllComponent, ChatGroupComponent],
  templateUrl: './chat-indy.component.html',
  styleUrl: './chat-indy.component.scss',
})
export class ChatIndyComponent {
  public chatAperta = signal<boolean>(false);
  public fullscreen = signal<boolean>(false);
  public currentChat = signal<Gruppo | null>(null);
  public currentMessaggi = signal<Messaggio[]>([]);
  public allGruppiRecord = signal<Record<number, LastMess>>({});

  public spinner = computed<boolean>(
    () => this.currentChat() !== null && this.currentMessaggi().length === 0,
  );

  @Input() bottomValue!: string;
  @Input() allGruppi: Gruppo[] = [];

  @Input() set messaggi(value: Messaggio[]) {
    this.currentMessaggi.set(value);
  }

  @Input() set lastMessaggi(value: Record<number, LastMess>) {
    this.allGruppiRecord.set(value);
  }

  @Output() currentChatChange = new EventEmitter<Gruppo | null>();
}
