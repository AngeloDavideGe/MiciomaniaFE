import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bottoni-squadre',
  standalone: true,
  imports: [],
  template: `
    <div class="row mt-4">
      <div class="col-12 text-center">
        <div class="btn-group" role="group">
          <button class="btn btn-outline-primary">
            <i class="fas fa-share-alt me-2"></i>Condividi
          </button>
          <button class="btn btn-outline-success">
            <i class="bi bi-download me-2" (click)="captureElement.emit()"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class BottoniSquadreComponent {
  @Output() captureElement = new EventEmitter<void>();
}
