import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MathService } from '../services/math.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-seleziona-operazione',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <section class="operation-section card shadow-sm mb-4">
      <div class="card-body">
        <h5 class="card-title">
          <i class="fas fa-sliders-h me-2 text-primary"></i>
          Seleziona Operazione
        </h5>
        <div class="row g-3">
          <div class="col-md-12">
            <label for="operationType" class="form-label"
              >Tipo di Operazione</label
            >
            <select
              class="form-select"
              id="operationType"
              #operationSelect
              (change)="operationChange.emit(operationSelect.value)"
            >
              <option value="">Scegli un'operazione...</option>
              @for (operation of mathService.supportedOperations; track $index)
              {
              <option value="{{ operation }}">
                {{ operation | titlecase }}
              </option>
              }
            </select>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .operation-section {
        border: none;
        border-radius: 15px;

        .card-body {
          padding: 2rem;
        }

        .card-title {
          color: #495057;
          border-bottom: 2px solid #007bff;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }
      }
    `,
  ],
})
export class SelezionaOperazioneComponent {
  public mathService = inject(MathService);

  @Output() operationChange = new EventEmitter<string>();
}
