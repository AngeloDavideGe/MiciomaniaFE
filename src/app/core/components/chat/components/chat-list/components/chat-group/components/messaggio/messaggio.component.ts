import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DropDownAperta,
  IMessaggioComponent,
  OutputDropdown,
} from '../../../../../../interfaces/chat-group.interface';

@Component({
  selector: 'app-messaggio',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="message" [class]="messageComp.class2">
      <img [src]="messageComp.urlPic" class="profile-pic" />

      <div class="message-content">
        <div class="message-header">
          <div class="message-sender">
            {{ messageComp.name }}
          </div>

          <!-- icona menu (⋮) -->
          <div
            class="menu-icon"
            (click)="toggleMenu($event, messageComp.message.sender)"
          >
            ⋮
          </div>

          <!-- dropdown -->
          @if(dropdownAperta && dropdownAperta.messaggioAperto ==
          messageComp.message.id ){
          <div class="dropdown">
            @for (item of dropdownAperta.dropdown; track $index) {
            <div class="dropdown-item" (click)="item.click()">
              {{ item.titolo }}
            </div>
            }
          </div>
          }
        </div>

        @if (messageComp.message.response) {
        <div id="MessaggioRisposta">
          <div class="reply-sender">{{ messageComp.replySender }}</div>
          <div class="reply-text">{{ messageComp.replyText }}</div>
        </div>
        }

        <div id="MessaggioInviato">
          <div class="message-text">{{ messageComp.message.content }}</div>
          <div class="message-timestamp">
            {{ messageComp.message.created_at | date : 'HH:mm - dd/MM/yyyy' }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './messaggio.component.scss',
})
export class MessaggioComponent {
  @Input() messageComp!: IMessaggioComponent;
  @Input() dropdownAperta!: DropDownAperta | null;
  @Output() openDropdown = new EventEmitter<OutputDropdown | null>();

  toggleMenu(event: MouseEvent, sender: string) {
    event.stopPropagation();

    if (this.messageComp.message.id != this.dropdownAperta?.messaggioAperto) {
      this.openDropdown.emit({
        idMessaggio: this.messageComp.message.id,
        idUser: sender,
      } as OutputDropdown);
    } else {
      this.openDropdown.emit(null);
    }
  }
}
