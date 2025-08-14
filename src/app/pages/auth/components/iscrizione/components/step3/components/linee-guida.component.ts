import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-linee-guida',
  standalone: true,
  imports: [],
  template: `
    <div
      class="card shadow-lg border-0 mt-4"
      style="border-radius: 12px; max-width: 900px;"
    >
      <div
        class="card-header text-white"
        style="background: linear-gradient(90deg, #0d6efd, #0b5ed7);"
      >
        <h5 class="mb-0 fs-4">Linee Guida</h5>
      </div>
      <div class="card-body p-4" style="background-color: #f8f9fa;">
        <ul class="list-group list-group-flush">
          @for (linea of lineeGuida; track $index) {
          <li
            class="list-group-item d-flex align-items-start p-3 fs-5"
            style="background-color: #ffffff;"
          >
            <div class="form-check me-3 mt-1">
              <input
                type="checkbox"
                class="form-check-input"
                [checked]="linea.checked"
                (change)="toggleCheck($index)"
              />
            </div>
            <label
              class="form-check-label flex-grow-1 mb-0"
              style="line-height: 1.4;"
            >
              {{ linea.frase }}
            </label>
          </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class LineeGuidaComponent {
  private lineeGuidaAccettate: boolean = false;
  public lineeGuida: { frase: string; checked: boolean }[] = [
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
