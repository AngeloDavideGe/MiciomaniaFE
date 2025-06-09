import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-linee-guida',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="m-3 p-4 bg-light border rounded shadow-lg w-75">
      <h5 class="text-primary mb-3 fs-4">Linee Guida</h5>
      <ul class="list-group list-group-flush">
        <li
          *ngFor="let linea of lineeGuida; let i = index"
          class="list-group-item d-flex align-items-start p-3 fs-5"
        >
          <div class="form-check me-3">
            <input
              type="checkbox"
              class="form-check-input"
              [checked]="linea.checked"
              (change)="toggleCheck(i)"
            />
          </div>
          <label class="form-check-label flex-grow-1 small mb-0 fs-5">
            {{ linea.frase }}
          </label>
        </li>
      </ul>
    </div>
  `,
})
export class LineeGuidaComponent {
  lineeGuidaAccettate = false;
  lineeGuida = [
    {
      frase:
        'Seguire le pratiche di sicurezza per proteggere i dati sensibili.',
      checked: false,
    },
    {
      frase: 'Garantire l’accessibilità e l’usabilità dei servizi digitali.',
      checked: false,
    },
    {
      frase: 'Mantenere una comunicazione chiara e tempestiva con il team.',
      checked: false,
    },
  ];

  @Output() lineeGuidaChanged = new EventEmitter<boolean>();

  toggleCheck(index: number): void {
    this.lineeGuida[index].checked = !this.lineeGuida[index].checked;
    this.lineeGuidaAccettate = this.lineeGuida.every((linea) => linea.checked);
    this.lineeGuidaChanged.emit(this.lineeGuidaAccettate);
  }
}
