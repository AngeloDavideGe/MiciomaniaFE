import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-tab-manga',
  standalone: true,
  imports: [],
  template: `
    <select
      class="form-select form-select-lg mb-3 mt-3"
      aria-label="Sposta i selezionati"
      (change)="spostaMangaSelezionati.emit($event)"
      style="width: auto; display: inline-block; margin-right: 10px"
    >
      <option value="">📦 Sposta i selezionati</option>
      <option value="Letti">📖 Leggendo</option>
      <option value="Completati">✅ Completati</option>
      <option value="Elimina">🗑️ Cestino</option>
    </select>
  `,
  styles: [``],
})
export class SelectTabMangaComponent {
  @Output() spostaMangaSelezionati = new EventEmitter<Event>();
}
