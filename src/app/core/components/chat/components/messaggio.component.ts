import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IMessaggioComponent } from '../interfaces/chat-group.interface';

@Component({
  selector: 'app-messaggio',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="message" [class]="messageComp.class2">
      <img [src]="messageComp.urlPic" class="profile-pic" />

      <div class="message-content">
        <div class="message-sender">
          {{ messageComp.name }}
        </div>

        @if (messageComp.message.response) {
        <div id="MessaggioRisposta">
          <div class="reply-sender">{{ messageComp.replySender }}</div>
          <div class="reply-text">{{ messageComp.replyText }}</div>
        </div>
        }

        <!-- MESSAGGIO INVIATO -->
        <div id="MessaggioInviato">
          <div class="message-text">{{ messageComp.message.content }}</div>
          <div class="message-timestamp">
            {{ messageComp.message.created_at | date : 'HH:mm - dd/MM/yyyy' }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .sent {
        background-color: #dcf8c6;
        margin-left: auto;
        border-top-right-radius: 0;
      }

      .received {
        background-color: white;
        margin-right: auto;
        border-top-left-radius: 0;
      }

      .message {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        padding: 10px 15px;
        border-radius: 10px;
        max-width: 75%;
        font-size: 0.95em;
        line-height: 1.4;
        word-wrap: break-word;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

        .profile-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          width: 100%;

          .message-sender {
            font-weight: bold;
            font-size: 0.85em;
            color: #075e54;
          }

          #MessaggioRisposta {
            border-left: 3px solid #34b7f1;
            background: rgba(0, 0, 0, 0.05);
            padding: 5px 10px;
            margin: 6px 0;
            border-radius: 5px;
            font-size: 0.85em;

            .reply-sender {
              font-weight: bold;
              color: #128c7e;
              margin-bottom: 3px;
            }

            .reply-text {
              color: #444;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          #MessaggioInviato {
            .message-text {
              margin-top: 5px;
            }

            .message-timestamp {
              font-size: 0.75em;
              color: #666;
              text-align: right;
            }
          }
        }
      }
    `,
  ],
})
export class MessaggioComponent {
  @Input() messageComp!: IMessaggioComponent;
}
