import { inject } from '@angular/core';
import { SquadreService } from '../../../../../shared/services/api/squadre.service';
import { AlertGamesService } from '../../../services/alert-games.service';

export abstract class GamesBase {
  protected alertGameService = inject(AlertGamesService);
  protected squadreService = inject(SquadreService);
}
