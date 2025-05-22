import { inject } from '@angular/core';
import { AlertGamesService } from '../services/alert-games.service';
import { SquadreService } from '../../../shared/services/squadre.service';

export abstract class GamesCustom {
  protected alertGameService = inject(AlertGamesService);
  protected squadreService = inject(SquadreService);
}
