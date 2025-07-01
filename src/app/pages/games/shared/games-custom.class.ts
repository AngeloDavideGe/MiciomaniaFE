import { inject } from '@angular/core';
import { SquadreHandler } from '../../../shared/handlers/squadre.handler';
import { AlertGamesService } from '../services/alert-games.service';

export abstract class GamesCustom {
  protected alertGameService = inject(AlertGamesService);
  protected squadreService = inject(SquadreHandler);
}
