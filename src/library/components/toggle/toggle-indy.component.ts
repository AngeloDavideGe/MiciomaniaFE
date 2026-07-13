import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
export class ToggleIndyComponent implements OnInit {
  public currentButton = signal<string>('');

  private readonly DEFAULT_STYLES: ToggleStyles = {
    top: '4rem',
    width: '15rem',
    position: 'fixed',
    right: 0,
  };

  @Input() titolo: string = '';
  @Input() imgIcona: string = '';
  @Input() icona: string = 'bi bi-list';
  @Input() toggleMenus!: ToggleProps[];
  @Input() toggleStyles: ToggleStyles = {};
  @Input() menuOpen = signal<boolean>(false);
  @Input() tipo: 'single' | 'multiple' | 'content' = 'multiple';

  @Output() aperturaMenu = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.toggleStyles = {
      ...this.DEFAULT_STYLES,
      ...this.toggleStyles,
    };
  }

  public toggleMenu(): void {
    this.menuOpen.update((x: boolean) => !x);
    this.aperturaMenu.emit(this.menuOpen());
  }

  public cambiaDropdown(drop: string): void {
    this.currentButton.update((x: string): string => (x == drop ? '' : drop));
  }
}
