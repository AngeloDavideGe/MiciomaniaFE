import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core';
import { PulsanteNavbar } from '../../interfaces/navbar.interface';

@Component({
  selector: 'app-bottom-navbar-indy',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bottom-navbar-indy.component.html',
  styleUrl: './bottom-navbar-indy.component.scss',
})
export class BottomNavbarComponent {
  public selectPulsante = signal<string>('');

  public pulsanti = input<PulsanteNavbar[]>([]);
  public initialPulsante = input<string>('');

  constructor() {
    effect(() => {
      this.selectPulsante.set(this.initialPulsante());
    });
  }

  public clickPulsante(pulsante: PulsanteNavbar): void {
    this.selectPulsante.update((x: string) =>
      pulsante.id === x ? '' : pulsante.id,
    );
    pulsante.azione();
  }
}
