import { Component, signal } from '@angular/core';
import { NavBarButton } from '../../shared/components/custom/navbar-custom.component';
import { song_imports } from './imports/song.import';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: song_imports,
  templateUrl: './song.component.html',
})
export class SongComponent {
  public navbarButtons: NavBarButton[] = this.getPulsanti();
  public componente = signal<'song' | 'proposta'>('song');

  private getPulsanti(): NavBarButton[] {
    return [
      {
        icon: 'bi bi-music-note-beamed',
        title: 'Canzoni Miciomania',
        action: () => this.componente.set('song'),
      },
      {
        icon: 'bi bi-plus-circle',
        title: 'Proponi una canzone',
        action: () => this.componente.set('proposta'),
      },
    ];
  }
}
