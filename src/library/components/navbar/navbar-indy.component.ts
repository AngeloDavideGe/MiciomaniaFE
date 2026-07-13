import { Component, effect, input, signal } from '@angular/core';
import { PulsanteNavbar } from '../../interfaces/navbar.interface';

@Component({
  selector: 'app-navbar-indy',
  standalone: true,
  imports: [],
  templateUrl: './navbar-indy.component.html',
  styleUrl: './navbar-indy.component.scss',
})
export class NavbarIndyComponent {
  public selectPulsante = signal<string>('');

  public pulsantiInizio = input<PulsanteNavbar[]>([]);
  public pulsantiCentro = input<PulsanteNavbar[]>([]);
  public pulsantiFine = input<PulsanteNavbar[]>([]);
  public initialPulsante = input<string>('');

  constructor() {
    effect(() => {
      this.selectPulsante.set(this.initialPulsante());
    });
  }

  public clickPulsante(pulsante: PulsanteNavbar): void {
    this.selectPulsante.update((x) => (pulsante.id === x ? '' : pulsante.id));

    pulsante.azione();
  }
}
