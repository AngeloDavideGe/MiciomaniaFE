import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { ISidebarItem } from '../../interfaces/navbar.interface';

@Component({
  selector: 'app-sidebar-indy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-indy.component.html',
  styleUrl: './sidebar-indy.component.scss',
})
export class SidebarIndyComponent {
  public titolo = input.required<string>();
  public elementi = input.required<ISidebarItem[]>();
  public width = input<string>('auto');

  public selezionato = model<string>();
  public selezionatChange = output<string>();

  click(item: ISidebarItem) {
    this.selezionato.set(item.id);
    this.selezionatChange.emit(item.id);
  }
}
