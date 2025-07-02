import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDataCustom } from '../../../../../../../shared/functions/utilities.function';
import { ProfiloHandler } from '../../../../../handlers/profilo.handler';
import { Tweet } from '../../../../../interfaces/profilo.interface';

@Component({
  selector: 'app-new-tweet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-tweet.component.html',
})
export class NewTweetComponent {
  public nuovoTweet: any;
  public testo: string = '';

  @Input() profiloHandler!: ProfiloHandler;
  @Input() idUtente!: string;
  @Output() chiudi = new EventEmitter<void>();

  inviaTweet() {
    if (this.testo.trim()) {
      this.nuovoTweet = {
        testo: this.testo,
        dataCreazione: formatDataCustom(new Date()),
        idUtente: this.idUtente,
      };
      this.inviaTweetDb(this.nuovoTweet);
      this.chiudiModale();
    }
  }

  chiudiModale() {
    this.chiudi.emit();
  }

  private inviaTweetDb(tweet: Tweet): void {
    this.profiloHandler.postPubblicazioni({
      tweet: tweet,
      nextCall: () => this.setProfiloPersonale(tweet),
    });
  }

  private setProfiloPersonale(tweet: Tweet): void {
    this.profiloHandler.profiloPersonale?.tweets.unshift(tweet);
    sessionStorage.setItem(
      'pubblicazioni',
      JSON.stringify(this.profiloHandler.profiloPersonale)
    );
  }
}
