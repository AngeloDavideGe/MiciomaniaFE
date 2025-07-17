import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  private profiloHandler = inject(ProfiloHandler);

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
      nextCall: () =>
        this.profiloHandler.profiloPersonale?.tweets.unshift(tweet),
    });
  }
}
