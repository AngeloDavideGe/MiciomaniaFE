import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifiche',
  standalone: true,
  template: `
    <div class="notification-container" id="notification">
      <div class="alert alert-success" role="alert">
        <strong>{{ sender }}</strong
        >: {{ content }}
      </div>
    </div>
  `,
  styles: [
    `
      .notification-container {
        position: fixed;
        z-index: 1050;
        width: 300px;
        padding: 10px;
        transition: all 0.3s ease-in-out;
      }

      @media (min-width: 768px) {
        .notification-container {
          bottom: 20px;
          right: 20px;
        }
      }

      @media (max-width: 767px) {
        .notification-container {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    `,
  ],
})
export class NotificheComponent {
  @Input() sender: string = '';
  @Input() content: string = '';
}
