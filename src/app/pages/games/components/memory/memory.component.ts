import { Component, inject, OnInit } from '@angular/core';
import { CardDeck } from '../../interfaces/games.interfaces';
import { DeckCardService } from '../../services/deck-card.service';
import { getCardsDisponibili } from '../../function/deck-card.function';
import { NgFor, NgIf } from '@angular/common';
import { DeckCardClass } from '../../class/deck-card.class';
import { AlertGamesService } from '../../services/alert-games.service';
import { DettagliGameComponent } from '../../shared/dettagli-game.component';
import { GamesCustom } from '../../shared/games-custom.class';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [NgIf, NgFor, DettagliGameComponent],
  templateUrl: './memory.component.html',
  // styles: ``
})
export class MemoryComponent extends GamesCustom implements OnInit {
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
