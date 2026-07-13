import {
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ToggleProps, ToggleStyles } from '../../interfaces/toggle.interface';

@Component({
  selector: 'app-toggle-indy',
  standalone: true,
  imports: [],
  templateUrl: './toggle-indy.component.html',
  styleUrl: './toggle-indy.component.scss',
})
export class ToggleIndyComponent {
  public currentButton = signal<string>('');

  private readonly DEFAULT_STYLES: ToggleStyles = {
    top: '4rem',
    width: '15rem',
    position: 'fixed',
    right: 0,
  };

  public titolo = input<string>('');
  public imgIcona = input<string>('');
  public icona = input<string>('bi bi-list');
  public toggleMenus = input<ToggleProps[]>([]);
  public toggleStyles = input<ToggleStyles>({});
  public tipo = input<'single' | 'multiple' | 'content'>('multiple');

  public menuOpen = model<boolean>(false);
  public aperturaMenu = output<boolean>();

  public styles = computed<ToggleStyles>(() => ({
    ...this.DEFAULT_STYLES,
    ...this.toggleStyles(),
  }));

  public toggleMenu(): void {
    this.menuOpen.update((x) => !x);

    this.aperturaMenu.emit(this.menuOpen());
  }

  public cambiaDropdown(drop: string): void {
    this.currentButton.update((x) => (x === drop ? '' : drop));
  }
}
