import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-chiusa',
  imports: [],
  template: `
    <div class="chat-button" (click)="apriChat.emit()">
      <div class="chat-icon">
        <i class="bi bi-chat-dots-fill"></i>
      </div>
      <span class="chat-text">Visualizza chat&nbsp;Miciomane</span>
    </div>
  `,
  styles: [
    `
      .chat-button {
        right: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: linear-gradient(
          135deg,
          #fd5949 0%,
          #d6249f 50%,
          #285aeb 100%
        );
        color: white;

        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0.5rem 1rem;
        border-radius: 50px;
      }

      .chat-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
      }

      .chat-button:active {
        transform: translateY(0);
      }

      .chat-icon i {
        font-size: 1.5rem;
      }

      .chat-text {
        font-size: 1rem;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .chat-button {
          width: 40px;
          height: 40px;
          padding: 0;
          border-radius: 50%;
          justify-content: center;
          right: 20px;

          &:hover {
            transform: scale(1.05);
          }
        }

        .chat-icon i {
          font-size: 1.4rem;
        }

        .chat-text {
          display: none;
        }
      }

      @media (max-width: 480px) {
        .chat-button {
          width: 48px;
          height: 48px;
          right: 15px;
        }

        .chat-icon i {
          font-size: 1.4rem;
        }
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        .chat-button {
          padding: 0.5rem 0.9rem;
        }

        .chat-text {
          font-size: 0.9rem;
        }
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(214, 36, 159, 0.7);
        }
        70% {
          box-shadow: 0 0 0 12px rgba(214, 36, 159, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(214, 36, 159, 0);
        }
      }
    `,
  ],
})
export class ChatChiusaComponent {
  @Output() apriChat = new EventEmitter<void>();
}
