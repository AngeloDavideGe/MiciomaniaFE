import { Component, Input, OnInit, signal } from '@angular/core';
import { PulsanteNavbar } from '../../interfaces/navbar.interface';

@Component({
  selector: 'app-navbar-indy',
  standalone: true,
  imports: [],
  templateUrl: './navbar-indy.component.html',
  styleUrl: './navbar-indy.component.scss',
})
export class NavbarIndyComponent implements OnInit {
  public selectPulsante = signal<string>('');

  @Input() pulsanti: PulsanteNavbar[] = [];
  @Input() initialPulsante: string = '';

  ngOnInit(): void {
    this.selectPulsante.set(this.initialPulsante);
  }

  public clickPulsante(pulsante: PulsanteNavbar): void {
    this.selectPulsante.set(pulsante.id);
    pulsante.azione();
  }
}
