import { Component, signal } from '@angular/core';
import { NavBarButton } from '../../shared/components/custom/navbar-custom.component';
import { song_imports } from './imports/song.import';
import { titoloPulsantiSong } from './components/ui/elementi-utente/functions/estenzione.function';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: song_imports,
  template: `
    <div style="overflow-x: hidden">
      <app-custom-navbar
        [goHomeBotton]="'home'"
        [altriBottoni]="navbarButtons"
        [selected]="selectedPulsante"
      ></app-custom-navbar>

      @switch (componente()) {
        @case ('song') {
          <app-canzoni-miciomania></app-canzoni-miciomania>
        }
        @case ('proposta') {
          <app-elementi-utente></app-elementi-utente>
        }
      }
    </div>
  `,
})
export class SongComponent {
  public componente = signal<'song' | 'proposta'>('song');
  public selectedPulsante = signal<string>('Canzoni Miciomania');
  public navbarButtons: NavBarButton[] = [
    {
      icon: 'bi bi-music-note-beamed',
      title: 'Canzoni Miciomania',
      action: () => this.actionBotton('song'),
    },
    {
      icon: 'bi bi-plus-circle',
      title: 'Proponi una Parodia',
      action: () => this.actionBotton('proposta'),
    },
  ];

  private actionBotton(id: 'song' | 'proposta'): void {
    this.componente.set(id);
    this.selectedPulsante.set(titoloPulsantiSong[id]);
  }
}
