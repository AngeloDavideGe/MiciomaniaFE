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
  templateUrl: './chat-input.component.html',
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
    if (!this.newMessage.trim()) return;

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
