import {
  AfterViewChecked,
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { User } from '../../../../../shared/interfaces/users.interface';
import { DataHttp } from '../../../../api/http.data';
import { getDropDown } from '../../functions/messaggi.function';
import { sendMessage } from '../../handlers/chat.handler';
import {
  DropDownAperta,
  IMessaggioComponent,
  Messaggio,
  OutputDropdown,
  RispostaInput,
} from '../../interfaces/chat-group.interface';
import { ChatGroupService } from '../../services/chat-group.service';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MessaggioComponent } from './components/messaggio/messaggio.component';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [MessaggioComponent, ChatInputComponent],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss',
})
export class ChatGroupComponent implements AfterViewChecked {
  private chatService = inject(ChatGroupService);

  public user!: User | null;
  private evitaSpam: boolean = true;
  private initialLoad: boolean = true;
  public risposta = signal<RispostaInput | null>(null);
  public dropdownAperta = signal<DropDownAperta | null>(null);

  @Input() messages!: Messaggio[];
  @Input() messaggiComp!: IMessaggioComponent[];
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

  constructor() {
    effect(() => {
      this.user = DataHttp.user();
      this.risposta.set(null);
      this.dropdownAperta.set(null);
    });
  }

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messages.length > 0) {
      this.scrollToBottom();
      setTimeout(() => (this.initialLoad = false), 200);
    }
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Errore durante lo scorrimento:', err);
    }
  }

  sendMessaggio(newMessaggio: string) {
    sendMessage({
      chatService: this.chatService,
      ifCond: this.evitaSpam,
      nextCall: () => this.evitaSpamFunc(),
      newMessage: newMessaggio,
      risposta: this.risposta()?.idMessaggio || null,
    });
    this.risposta.set(null);
  }

  private evitaSpamFunc(): void {
    this.evitaSpam = false;
    this.initialLoad = true;
    setTimeout(() => (this.evitaSpam = true), 2000);
  }

  changeDropdown(event: OutputDropdown | null, messaggio: Messaggio): void {
    if (this.user && this.user.id && event) {
      const risposta: RispostaInput = {
        idMessaggio: messaggio.id,
        idUser: messaggio.sender,
        content: messaggio.content,
      };

      this.dropdownAperta.set({
        messaggioAperto: event.idMessaggio,
        dropdown: getDropDown({
          cond: this.user.id == event.idUser,
          rispondiFunc: () => this.risposta.set(risposta),
          eliminaFunc: () => console.log('Elimina'),
        }),
      } as DropDownAperta);
    }
  }
}
