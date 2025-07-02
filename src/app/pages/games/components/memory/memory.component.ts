import { Component, inject, OnInit } from '@angular/core';
import { DeckCardClass } from '../../class/deck-card.class';
import { getCardsDisponibili } from '../../functions/deck-card.function';
import { CardDeck } from '../../interfaces/games.interfaces';
import { DeckCardService } from '../../services/deck-card.service';
import { GamesBase } from '../../shared/base/games.base';
import { games_imports } from '../../shared/imports/games.imports';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: games_imports,
  templateUrl: './memory.component.html',
})
export class MemoryComponent extends GamesBase implements OnInit {
  public cards: CardDeck[] = [];
  public coppieTrovate: string[] = [];
  public selectedCards: Map<number, boolean> = new Map();
  private firstCardSelect: { id: string; index: number } | null = null;
  public nextMove: boolean = true;
  public numeroCoppie: number = 6;
  public deckCardClass = new DeckCardClass();

  private deckCardService = inject(DeckCardService);

  ngOnInit(): void {
    this.cards = getCardsDisponibili(
      this.deckCardService.pescataNoHttp.cards,
      this.numeroCoppie
    );
  }

  selectCardFunc(card: CardDeck, index: number): void {
    if (this.condCoppia(index)) {
      return;
    }

    this.nextMove = false;
    this.selectedCards.set(index, true);

    if (this.firstCardSelect) {
      this.controlloCoppia(card, index);
    } else {
      this.firstCardSelect = {
        id: card.code,
        index: index,
      };
      this.nextMove = true;
    }
  }

  private condCoppia(index: number): boolean {
    return (
      this.selectedCards.get(index) ||
      this.firstCardSelect?.index === index ||
      !this.nextMove
    );
  }

  private controlloCoppia(card: CardDeck, index: number): void {
    const fineGioco = this.fineGioco();

    setTimeout(() => {
      if (this.firstCardSelect?.id !== card.code) {
        this.selectedCards.delete(index);
        this.selectedCards.delete(this.firstCardSelect!.index);
      } else {
        this.coppieTrovate.push(card.code);
      }
      if (fineGioco) {
        this.restartGioco();
        this.alertGameService.alert('vittoria');
        this.squadreService.setPunteggioOttenuto = 2;
      }
      this.firstCardSelect = null;
      this.nextMove = true;
    }, 1000);
  }

  private fineGioco(): boolean {
    let selectedCount: number = 0;

    this.selectedCards.forEach((isSelected) => {
      if (isSelected) {
        selectedCount++;
      }
    });

    return selectedCount === this.cards.length;
  }

  private restartGioco(): void {
    this.selectedCards = new Map();
    this.cards = getCardsDisponibili(
      this.deckCardService.pescataNoHttp.cards,
      this.numeroCoppie
    );
  }
}
