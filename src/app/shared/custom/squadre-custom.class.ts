import { inject } from '@angular/core';
import { take } from 'rxjs';
import { SquadreService } from '../services/squadre.service';

export abstract class SquadreCustom {
  protected squadreService = inject(SquadreService);

  protected loadSquadre(params: {
    ifCall: Function;
    elseCall: Function;
    nextCall: Function;
  }): void {
    if (this.squadreService.squadre.length == 0) {
      params.ifCall();
      this.squadreService
        .getSquadre()
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.squadreService.squadre = data;
            params.nextCall();
          },
          error: (err) => console.error('errore nel recupero squadre', err),
        });
    } else {
      params.elseCall();
    }
  }
}
