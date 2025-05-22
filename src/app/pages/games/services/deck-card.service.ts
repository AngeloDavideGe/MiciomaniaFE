import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Deck, DrawDeck } from '../interfaces/games.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DeckCardService {
  public deckHttp: Deck = {} as Deck;
  public pescataHttp: DrawDeck = {} as DrawDeck;
  public pescataNoHttp: DrawDeck = {} as DrawDeck;

  constructor(private http: HttpClient) {}

  createDeck(): Observable<Deck> {
    const url = `${environment.urlDeckCard}/new/shuffle/`;
    return this.http.get<Deck>(url);
  }

  getRandomCards(count: number): Observable<DrawDeck> {
    const url = `${environment.urlDeckCard}/${this.deckHttp.deck_id}/draw/?count=${count}`;
    return this.http.get<DrawDeck>(url);
  }

  getDeckAndDrawCards(count: number): Observable<DrawDeck> {
    const url = `${environment.urlDeckCard}/new/draw/?count=${count}`;
    return this.http.get<DrawDeck>(url);
  }
}
