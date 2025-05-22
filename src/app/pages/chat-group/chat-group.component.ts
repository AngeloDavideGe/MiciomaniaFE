import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthCustom } from '../../shared/custom/auth-custom.class';
import { LoadingService } from '../../shared/services/loading.service';
import { User, UserParams } from '../auth/interfaces/users.interface';
import { Messaggio } from './interfaces/chat-group.interface';
import { ChatGroupService } from './services/chat-group.service';
import { formatDataCustom } from '../../shared/function/utilities.function';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DatePipe],
  templateUrl: './chat-group.component.html',
})
export class ChatGroupComponent
  extends AuthCustom
  implements OnInit, AfterViewChecked, OnDestroy
{
  public idUtente: string = '';
  public newMessage: string = '';
  private evitaSpam: boolean = true;
  private initialLoad = true;
  public userMessageMap: { [id: string]: { nome: string; pic: string } } = {};
  public messages: Messaggio[] = [];
  public user: User | null = null;
  private destroy$ = new Subject<void>();

  private chatService = inject(ChatGroupService);
  private loadingService = inject(LoadingService);

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  ngOnInit(): void {
    this.sottoscrizioneUtente({
      userFunc: (user) => {
        user ? (this.idUtente = user.id) : null;
        this.user = user;
        this.loadMessaggiEUtenti();
        if (this.authService.users.length === 0) {
          this.sottoscrizioneUtenti({
            nextCall: (data) => {
              this.saveUsers(data);
              this.saveProfilePic();
            },
          });
        } else {
          this.saveProfilePic();
        }
      },
      destroy$: this.destroy$,
    });
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

  private saveUsers(data: UserParams[]): void {
    this.authService.users = data.filter((x) => x.id != this.idUtente);
    sessionStorage.setItem('users', JSON.stringify(this.authService.users));
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
      this.loadingService.show();
      this.chatService
        .loadMessages('550e8400-e29b-41d4-a716-446655440000')
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.chatService.messaggiCaricatiBool = true;
            this.loadingService.hide();
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
