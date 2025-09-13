import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div id="ChatInput">
      <input
        [(ngModel)]="newMessage"
        [placeholder]="
          idUtente ? 'Scrivi un messaggio' : 'Effettua login per scrivere'
        "
        [disabled]="!idUtente || spinner"
        (keyup.enter)="sendMessaggioFunc()"
      />
      <button (click)="sendMessaggioFunc()">Invia</button>
    </div>
  `,
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  public newMessage: string = '';
  @Input() idUtente!: string;
  @Input() spinner!: boolean;
  @Output() sendMessaggio = new EventEmitter<string>();

  sendMessaggioFunc(): void {
    if (!!this.newMessage.trim()) {
      this.sendMessaggio.emit(this.newMessage);
      this.newMessage = '';
    }
  }
}
