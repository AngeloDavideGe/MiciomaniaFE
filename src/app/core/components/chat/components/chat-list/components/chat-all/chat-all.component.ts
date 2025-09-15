import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gruppo } from '../../../../interfaces/chat-group.interface';

@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div id="ChatAllContainer" class="h-100 d-flex flex-column">
      <!-- Header della lista chat -->
      <div class="chat-header p-3 bg-light border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Chat</h5>
          <div class="header-actions">
            <button class="btn btn-outline-secondary btn-sm me-2">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-outline-secondary btn-sm">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Barra di ricerca -->
      <div class="search-container p-3 border-bottom">
        <div class="input-group">
          <span class="input-group-text bg-light border-end-0">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Cerca o inizia una nuova chat"
            [(ngModel)]="searchTerm"
          />
        </div>
      </div>

      <!-- Lista delle chat -->
      <div class="chat-list flex-grow-1 overflow-auto">
        @for (gruppo of filteredGruppi; track $index) {
        <div
          class="chat-item d-flex align-items-center p-3 border-bottom"
          (click)="apriGruppo.emit(gruppo.id)"
        >
          <div class="chat-avatar me-3">
            <div
              class="avatar-placeholder rounded-circle bg-secondary d-flex align-items-center justify-content-center"
            >
              <span class="text-white">{{ gruppo.nome.charAt(0) }}</span>
            </div>
          </div>
          <div class="chat-info flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="mb-0">{{ gruppo.nome }}</h6>
              <small class="text-muted">16:45</small>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0 text-truncate text-muted">Ultimo messaggio...</p>
              <span class="badge bg-primary rounded-pill">3</span>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styleUrl: './chat-all.component.scss',
})
export class ChatAllComponent {
  @Input() listaGruppi!: Gruppo[];
  @Output() apriGruppo = new EventEmitter<number>();

  searchTerm: string = '';

  get filteredGruppi(): Gruppo[] {
    if (!this.searchTerm) {
      return this.listaGruppi;
    }

    return this.listaGruppi.filter((gruppo) =>
      gruppo.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
