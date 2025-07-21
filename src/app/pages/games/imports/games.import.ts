import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PunteggiGamesComponent } from '../components/ui/dettagli-games.component';
import { ListaGamesComponent } from '../components/ui/lista-games.component';
import { PresentazioneGamesComponent } from '../components/ui/presentazione-games.component';

export const games_imports = [
  RouterOutlet,
  AsyncPipe,
  PresentazioneGamesComponent,
  PunteggiGamesComponent,
  ListaGamesComponent,
];
