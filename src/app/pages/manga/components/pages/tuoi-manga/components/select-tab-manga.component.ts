import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuoiMangaLang } from '../languages/interfaces/tuoiManga-lang.interface';

@Component({
  selector: 'app-select-tab-manga',
  standalone: true,
  imports: [],
  template: `
    <select
      class="form-select form-select-lg mb-3 mt-3 ms-2"
      aria-label="Sposta i selezionati"
      (change)="spostaMangaSelezionati.emit($event)"
      style="width: auto; display: inline-block; margin-right: 10px"
    >
      <option value="">📦 {{ tuoiMangaLang.spostaSelezionati }}</option>
      <option value="Letti">📖 {{ tuoiMangaLang.leggendo }}</option>
      <option value="Completati">✅ {{ tuoiMangaLang.completati }}</option>
      <option value="Elimina">🗑️ {{ tuoiMangaLang.cestino }}</option>
    </select>
  `,
})
export class SelectTabMangaComponent {
  @Input() tuoiMangaLang!: TuoiMangaLang;
  @Output() spostaMangaSelezionati = new EventEmitter<Event>();
}
