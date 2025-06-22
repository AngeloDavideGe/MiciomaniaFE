import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { formatDataCustom } from '../../../../shared/functions/utilities.function';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { Messaggio } from './../interfaces/chat-group.interface';
import { ChatGroupService } from './../services/chat-group.service';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DatePipe],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss',
})
export class ChatGroupComponent implements OnInit, AfterViewChecked, OnDestroy {
  public idUtente: string = '';
  public newMessage: string = '';
  private evitaSpam: boolean = true;
  private initialLoad: boolean = true;
  public spinner: boolean = false;
  public userMessageMap: { [id: string]: { nome: string; pic: string } } = {};
  public messages: Messaggio[] = [];
  public user: User | null = null;
  private destroy$ = new Subject<void>();

  private chatService = inject(ChatGroupService);

  @Input() authService!: AuthService;
  @Output() chiudiChat = new EventEmitter<void>();
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

  ngOnInit(): void {
    this.inizializeChat();
    this.changeUserSubscription();
  }

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messages.length > 0) {
      this.scrollToBottom();
      setTimeout(() => {
        this.initialLoad = false;
      }, 200);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inizializeChat(): void {
    this.user = this.authService.getUser;
    this.idUtente = this.user ? this.user.id : '';
    this.loadMessaggiEUtenti();
    this.saveProfilePic();
  }

  private changeUserSubscription(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.user = user;
        this.idUtente = user ? user.id : '';
        this.saveProfilePic();
      },
      error: (err) => console.error('errore recupero utente', err),
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

  private loadMessaggiEUtenti(): void {
    this.loadMessaggi();
    this.sottoscrizioneMessaggi();
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

  private saveProfilePic(): void {
    this.userMessageMap = this.authService.users.reduce((map, utente) => {
      if (utente) {
        map[utente.id] = {
          nome: utente.nome || '',
          pic: utente.profilePic || '',
        };
      } else {
        map[utente] = {
          nome: 'Anonimo',
          pic: 'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
        };
      }
      return map;
    }, {} as { [id: string]: { nome: string; pic: string } });
  }

  private loadMessaggi(): void {
    if (!this.chatService.messaggiCaricatiBool) {
      this.spinner = true;
      this.chatService
        .loadMessages('550e8400-e29b-41d4-a716-446655440000')
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.chatService.messaggiCaricatiBool = true;
            this.spinner = false;
          },
          error: (err) => console.error('errore load message', err),
        });
    }
  }

  private sottoscrizioneMessaggi(): void {
    this.chatService.messages$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (mess) => (this.messages = mess),
      error: (err) => console.error('errore nel recupero messaggi', err),
    });
  }
}
