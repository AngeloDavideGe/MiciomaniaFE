import { Component, input, output, signal } from '@angular/core';
import { ISidebarItem } from '../../interfaces/sidebar.interface';

@Component({
  selector: 'app-sidebar-indy',
  standalone: true,
  templateUrl: './sidebar-indy.component.html',
  styleUrl: './sidebar-indy.component.scss',
})
export class SidebarIndyComponent {
  public titolo = input.required<string>();
  public elementi = input.required<ISidebarItem[]>();
  public maxWidth = input<string>('15rem');
  public selezionato = input<string>();
  public selezionatoChange = output<string>();

  public selected = signal<string | null>(null);

  ngOnInit() {
    this.selected.set(this.selezionato() ?? null);
  }

  click(item: ISidebarItem) {
    this.selected.set(item.id);
    this.selezionatoChange.emit(item.id);
  }
}
