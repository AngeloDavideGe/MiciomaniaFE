import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ModificaInput,
  RispostaInput,
} from '../../../../../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div id="ChatInput">
      <!-- Messaggio di risposta -->
      @if(risposta) {
      <div class="reply-container">
        <div class="reply-indicator"></div>
        <div class="reply-content">
          <div class="reply-header">
            <span class="reply-name">{{ risposta.idUser }}</span>
            <span class="reply-label"></span>
            <button class="reply-close" (click)="closeRisposta.emit()">
              ✕
            </button>
          </div>
          <p class="reply-message">{{ risposta.content }}</p>
        </div>
      </div>
      } @if(modifica) {
      <div class="reply-container">
        <div class="reply-indicator"></div>
        <div class="reply-content">
          <div class="reply-header">
            <span class="reply-label"></span>
            <button class="reply-close" (click)="closeModifica.emit()">
              ✕
            </button>
          </div>
          <p class="reply-message">{{ modifica.content }}</p>
        </div>
      </div>
      }

      <!-- Input per il testo -->
      <div class="input-container">
        <input
          [(ngModel)]="newMessage"
          [placeholder]="
            idUtente ? 'Scrivi un messaggio' : 'Effettua login per scrivere'
          "
          [disabled]="!idUtente"
          (keyup.enter)="sendMessaggioFunc()"
        />
        <button (click)="sendMessaggioFunc()">
          <svg viewBox="0 0 24 24" width="24" height="24" class="send-icon">
            <path
              fill="currentColor"
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  public newMessage: string = '';
  @Input() idUtente!: string;
  @Input() risposta!: RispostaInput | null;
  @Input() modifica!: ModificaInput | null;
  @Output() sendMessaggio = new EventEmitter<ModificaInput>();
  @Output() closeRisposta = new EventEmitter<void>();
  @Output() closeModifica = new EventEmitter<void>();

  sendMessaggioFunc(): void {
    if (!!this.newMessage.trim()) {
      if (this.modifica) {
        this.sendMessaggio.emit({
          idMessaggio: this.modifica.idMessaggio,
          content: this.newMessage.trim(),
        });
      } else {
        this.sendMessaggio.emit({
          idMessaggio: null,
          content: this.newMessage.trim(),
        });
      }
      this.newMessage = '';
    }
  }
}
