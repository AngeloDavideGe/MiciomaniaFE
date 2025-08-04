import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icone-lista',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-end align-items-center mb-3">
      <button
        class="btn btn-outline-secondary me-2"
        [class.active]="classNG === ngClass1"
        (click)="classNGChange.emit(ngClass1)"
        title="Visualizza affiancati"
      >
        <i class="bi bi-grid"></i>
      </button>
      <button
        class="btn btn-outline-secondary"
        [class.active]="classNG === ngClass2"
        (click)="classNGChange.emit(ngClass2)"
        title="Visualizza uno sopra l'altro"
      >
        <i class="bi bi-list"></i>
      </button>
    </div>
  `,
  styles: [``],
})
export class IconeListaComponent {
  @Input() classNG!: string;
  @Input() ngClass1!: string;
  @Input() ngClass2!: string;
  @Output() classNGChange = new EventEmitter<string>();
}
