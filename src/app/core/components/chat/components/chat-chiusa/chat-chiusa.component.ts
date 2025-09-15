import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-chiusa',
  imports: [],
  template: `<div
    class="position-fixed bottom-0 end-0 mb-3 me-3 d-flex align-items-center rounded-pill shadow position-relative"
    style="
    background: linear-gradient(135deg, #fd5949 0%, #d6249f 50%, #285aeb 100%);
    color: #fff;
    cursor: pointer;
    padding: 0.5rem 1rem;
    z-index: 1080;
  "
    (click)="apriChat.emit()"
  >
    <!-- icona Bootstrap Icons (opzionale) -->
    <div class="position-relative me-2">
      <i class="bi bi-chat-dots-fill fs-4"></i>
    </div>

    <span>Visualizza chat&nbsp;Miciomane</span>
  </div>`,
})
export class ChatChiusaComponent {
  @Output() apriChat = new EventEmitter<void>();
}
