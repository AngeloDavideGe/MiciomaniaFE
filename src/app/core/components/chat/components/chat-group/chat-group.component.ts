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
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { formatDataCustom } from '../../../../../shared/functions/utilities.function';
import { User } from '../../../../../shared/interfaces/users.interface';
import { DataHttp } from '../../../../api/http.data';
import {
  mapMessageId,
  mapUserMessage,
} from '../../functions/user-map.function';
import {
  IMessaggioComponent,
  Messaggio,
  UserReduced,
} from '../../interfaces/chat-group.interface';
import { ChatGroupService } from '../../services/chat-group.service';
import { MessaggioComponent } from '../messaggio.component';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [FormsModule, MessaggioComponent],
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
  public messagesIdMap: Record<number, Messaggio> = {};
  public userMessageMap: Signal<Record<string, UserReduced>> = computed(() =>
    mapUserMessage()
  );
  public messages: Signal<Messaggio[]> = computed(() => {
    const messaggi: Messaggio[] = this.chatService.messages();
    this.messagesIdMap = mapMessageId(messaggi);
    return messaggi;
  });

  @Output() chiudiChat = new EventEmitter<void>();
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

  constructor() {
    this.changeUserEffect();
  }

  ngOnInit(): void {
    this.loadMessaggi();
  }

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messages().length > 0) {
      this.scrollToBottom();
      setTimeout(() => {
        this.initialLoad = false;
      }, 200);
    }
  }

  private changeUserEffect(): void {
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

  getIMessaggioComponent(messaggio: Messaggio): IMessaggioComponent {
    let userVar: { name: string; urlPic: string; class2: 'sent' | 'received' };
    let risposta: { sender: string; text: string };

    if (messaggio.sender == this.idUtente) {
      userVar = {
        name:
          (this.user?.credenziali?.nome || 'N.B') +
          ' (' +
          (this.user?.id || 'N.B') +
          ')',
        urlPic:
          this.user?.credenziali?.profilePic ||
          'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
        class2: 'sent',
      };
    } else {
      userVar = {
        name:
          this.userMessageMap()[messaggio.sender].nome +
            ' (' +
            messaggio.sender +
            ')' || 'N.B',
        urlPic:
          this.userMessageMap()[messaggio.sender].pic ||
          'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
        class2: 'received',
      };
    }

    if (messaggio.response) {
      risposta = {
        sender: this.messagesIdMap[messaggio.response].sender,
        text: this.messagesIdMap[messaggio.response].content,
      };
    } else {
      risposta = {
        sender: '',
        text: '',
      };
    }

    return {
      message: messaggio,
      name: userVar.name,
      urlPic: userVar.urlPic,
      replySender: risposta.sender,
      replyText: risposta.text,
      class2: userVar.class2,
    } as IMessaggioComponent;
  }
}
