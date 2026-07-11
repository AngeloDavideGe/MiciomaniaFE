import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  DropDownAperta,
  DropDownMessaggi,
  IMessaggioComponent,
  Messaggio,
  MessaggioSend,
  ModificaInput,
  OutputDropdown,
  RispostaInput,
  UserReduced,
} from '../../../../interfaces/chat.interface';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { MessaggioComponent } from './components/messaggio/messaggio.component';

@Component({
  selector: 'app-chat-group',
  standalone: true,
  imports: [MessaggioComponent, ChatInputComponent, DatePipe],
  templateUrl: './chat-group.component.html',
  styleUrl: './chat-group.component.scss',
})
export class ChatGroupComponent implements AfterViewChecked {
  private initialLoad: boolean = true;
  public currentDate: string = 'Oggi';
  public messages = signal<Messaggio[]>([]);
  public risposta = signal<RispostaInput | null>(null);
  public modifica = signal<ModificaInput | null>(null);
  public dropdownAperta = signal<DropDownAperta | null>(null);

  @Input() userId: string = '';
  @Input() chatId!: number;
  @Input() messaggiComp = signal<IMessaggioComponent[]>([]);
  @Input() fullscreen = signal<boolean>(false);
  @Input() recordIdPic: Record<string, UserReduced> = {};

  @Input() set messaggi(value: Messaggio[]) {
    this.messages.set(value);
    // this.messaggiComp.set({});
  }

  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @ViewChild('chatInput') chatInput!: ChatInputComponent;

  @Output() inviaMessaggio = new EventEmitter<MessaggioSend>();
  @Output() modificaMessaggio = new EventEmitter<{
    id: number;
    content: string;
  }>();
  @Output() eliminaMessaggio = new EventEmitter<number>();

  ngAfterViewChecked(): void {
    if (this.initialLoad && this.messaggiComp().length > 0) {
      this.scrollToBottom();
      setTimeout(() => (this.initialLoad = false), 200);
    }
  }

  public effectByChatList(): void {
    this.risposta.set(null);
    this.dropdownAperta.set(null);
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatMessages.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Errore durante lo scorrimento:', err);
    }
  }

  sendOrEditMessaggio(newMessaggio: ModificaInput): void {
    if (newMessaggio.idMessaggio) {
      this.modificaMessaggio.emit({
        id: newMessaggio.idMessaggio,
        content: newMessaggio.content,
      });
      this.modifica.set(null);
    } else {
      this.sendMessaggio(newMessaggio.content);
    }
  }

  private sendMessaggio(content: string): void {
    const lastMess: Messaggio =
      this.messages()[this.messages().length - 1] || {};
    const lastDate: Date | null = lastMess.created_at
      ? lastMess.created_at
      : null;

    let separator: boolean =
      !lastDate ||
      this.messages.length === 0 ||
      new Date(lastDate).getDate() !== new Date().getDate();

    this.inviaMessaggio.emit({
      chat_id: this.chatId,
      sender: this.userId,
      content: content,
      created_at: new Date(),
      response: this.risposta()?.idMessaggio || null,
      separator: separator,
    });

    this.risposta.set(null);
  }

  changeDropdown(event: OutputDropdown | null, messaggio: Messaggio): void {
    if (this.userId && event) {
      const risposta: RispostaInput = {
        idMessaggio: messaggio.id,
        idUser: messaggio.sender,
        content: messaggio.content,
      };

      const modifica: ModificaInput = {
        idMessaggio: messaggio.id,
        content: messaggio.content,
      };

      const rispOrModifica: Function = (
        tipo: RispostaInput | ModificaInput,
      ) => {
        if ('idUser' in tipo) {
          this.modifica.set(null);
          this.risposta.set(tipo);
        } else {
          this.risposta.set(null);
          this.modifica.set(tipo);
          this.chatInput.newMessage = tipo.content;
        }
      };

      const eliminaMessaggio: Function = () =>
        this.eliminaMessaggio.emit(event.idMessaggio);

      this.dropdownAperta.set({
        messaggioAperto: event.idMessaggio,
        dropdown: getDropDown({
          cond: this.userId == event.idUser,
          rispondiFunc: () => rispOrModifica(risposta),
          modificaFunc: () => rispOrModifica(modifica),
          eliminaFunc: () => eliminaMessaggio(),
        }),
      } as DropDownAperta);
    }
  }
}

function getDropDown(params: {
  cond: boolean;
  rispondiFunc: Function;
  modificaFunc: Function;
  eliminaFunc: Function;
}): DropDownMessaggi[] {
  const dropdown: DropDownMessaggi[] = [
    {
      titolo: 'Rispondi',
      click: () => params.rispondiFunc(),
      cond: true,
    },
    {
      titolo: 'Modifica',
      click: () => params.modificaFunc(),
      cond: params.cond,
    },
    {
      titolo: 'Elimina',
      click: () => params.eliminaFunc(),
      cond: params.cond,
    },
  ];

  return dropdown.filter((x: DropDownMessaggi) => x.cond);
}
