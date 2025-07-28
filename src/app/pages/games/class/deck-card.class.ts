import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardDeck } from '../interfaces/games.interfaces';
import { DeckCardService } from '../services/deck-card.service';

export class DeckCardClass {
  private deckCardService = inject(DeckCardService);
}
