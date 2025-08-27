import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { take } from 'rxjs';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { User } from '../../../../shared/interfaces/users.interface';
import { Messaggio, UserReduced } from './../interfaces/chat-group.interface';
import { ChatGroupService } from './../services/chat-group.service';
import { FormsModule } from '@angular/forms';
import { mapUserMessage } from '../functions/user-map.function';
import { DataHttp } from '../../../api/http.data';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss',
})
export class ChatGroupComponent implements OnInit, AfterViewChecked {
  private chatService = inject(ChatGroupService);

  public idUtente: string = '';
  public newMessage: string = '';
  private evitaSpam: boolean = true;
  private initialLoad: boolean = true;
  public spinner = signal<boolean>(false);
  public user: User | null = null;
  public messages: Signal<Messaggio[]> = computed(() =>
    this.chatService.messages()
  );
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );

  @Output() chiudiChat = new EventEmitter<void>();
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

  constructor() {
    this.changeUserSubscription();
  }

  ngOnInit(): void {
    this.inizializeChat();
  }

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messages().length > 0) {
      this.scrollToBottom();
      setTimeout(() => {
        this.initialLoad = false;
      }, 200);
    }
  }

  private inizializeChat(): void {
    this.user = DataHttp.user();
    this.idUtente = this.user ? this.user.id : '';
    this.loadMessaggi();
  }

  private changeUserSubscription(): void {
    effect(() => {
      const user: User | null = DataHttp.user();
      this.user = user;
      this.idUtente = user ? user.id : '';
    });
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Errore durante lo scorrimento:', err);
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.evitaSpam) {
      this.chatService
        .sendMessage(
          '550e8400-e29b-41d4-a716-446655440000',
          this.idUtente,
          this.newMessage,
          formatDataCustom(new Date())
        )
        .pipe(take(1))
        .subscribe({
          next: () => this.evitaSpamFunc(),
        });
      this.newMessage = '';
    }
  }

  private evitaSpamFunc(): void {
    this.evitaSpam = false;
    this.initialLoad = true;
    setTimeout(() => (this.evitaSpam = true), 2000);
  }

  private loadMessaggi(): void {
    if (!this.chatService.messaggiCaricatiBool) {
      this.spinner.set(true);
      this.chatService
        .loadMessages('550e8400-e29b-41d4-a716-446655440000')
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.chatService.messaggiCaricatiBool = true;
            this.spinner.set(false);
          },
          error: (err) => console.error('errore load message', err),
        });
    }
  }
}
