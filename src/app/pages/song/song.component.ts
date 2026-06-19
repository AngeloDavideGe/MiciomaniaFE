import { Component, signal } from '@angular/core';
import { NavBarButton } from '../../../library/interfaces/navbar.interface';
import { song_imports } from './song.import';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: song_imports,
  template: `
    <app-custom-navbar
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
    const titoloPulsantiSong: Record<string, string> = {
      song: 'Canzoni Miciomania',
      proposta: 'Proponi una Parodia',
    };

    this.componente.set(id);
    this.selectedPulsante.set(titoloPulsantiSong[id]);
  }
}
