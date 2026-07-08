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
  selector: 'app-toggle-custom',
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
  };

  @Input() toggleMenus!: ToggleProps[];
  @Input() icona: string = 'bi bi-list';
  @Input() imgIcona: string = '';
  @Input() tipo: 'single' | 'multiple' | 'content' = 'multiple';
  @Input() menuOpen = signal<boolean>(false);
  @Input() toggleStyles: ToggleStyles = {};

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
