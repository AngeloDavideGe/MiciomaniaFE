import { Component, inject, OnInit, signal } from '@angular/core';
import { getCasualCard } from '../../../functions/deck-card.function';
import { CardDeck } from '../../../interfaces/games.interfaces';
import { DeckCardService } from '../../../services/deck-card.service';
import { GamesBase } from '../../../shared/base/games.base';
import { DettagliGameComponent } from '../../../shared/components/dettagli-game.component';
import { setPunteggioOttenuto } from '../../../../../shared/handlers/squadre.handler';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [DettagliGameComponent],
  templateUrl: './memory.component.html',
})
export class MemoryComponent extends GamesBase implements OnInit {
  private deckCardService = inject(DeckCardService);

  public cards = signal<CardDeck[]>([]);
  public coppieTrovate = signal<string[]>([]);
  public selectedCards = new Map<number, boolean>();
  private firstCardSelect: { id: string; index: number } | null = null;
  private nextMove: boolean = true;
  private numCoppieTrovate: number = 0;
  private readonly numeroCoppie: number = 6;

  ngOnInit(): void {
    this.cards.set(
      getCasualCard(
        this.deckCardService.pescataNoHttp.cards,
        this.numeroCoppie,
        2,
        false
      ) as CardDeck[]
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
    setTimeout(() => {
      if (this.firstCardSelect?.id !== card.code) {
        this.selectedCards.delete(index);
        this.selectedCards.delete(this.firstCardSelect!.index);
      } else {
        this.coppieTrovate.update((coppie) => [...coppie, card.code]);
        this.numCoppieTrovate++;
      }

      if (this.numCoppieTrovate == this.numeroCoppie) {
        this.restartGioco();
        this.alertGameService.alert('vittoria');
        setPunteggioOttenuto(2);
      }

      this.firstCardSelect = null;
      this.nextMove = true;
    }, 1000);
  }

  private restartGioco(): void {
    this.selectedCards = new Map<number, boolean>();
    this.coppieTrovate.set([]);
    this.numCoppieTrovate = 0;
    this.cards.set(
      getCasualCard(
        this.deckCardService.pescataNoHttp.cards,
        this.numeroCoppie,
        2,
        false
      ) as CardDeck[]
    );
  }
}
