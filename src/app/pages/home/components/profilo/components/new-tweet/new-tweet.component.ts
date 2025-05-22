import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { formatDataCustom } from '../../../../../../shared/function/utilities.function';
import { Tweet } from '../../../../interfaces/profilo.interface';
import { ProfiloService } from '../../../../services/profilo.service';

@Component({
  selector: 'app-new-tweet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-tweet.component.html',
})
export class NewTweetComponent {
  public nuovoTweet: any;
  public testo: string = '';

  @Input() profiloService!: ProfiloService;
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
    this.profiloService
      .postPubblicazioni(tweet)
      .pipe(take(1))
      .subscribe({
        next: () => this.setProfiloPersonale(tweet),
        error: (err) =>
          console.error('errore nella pubblicazione del tweer', err),
      });
  }

  private setProfiloPersonale(tweet: Tweet): void {
    this.profiloService.profiloPersonale?.tweets.unshift(tweet);
    sessionStorage.setItem(
      'pubblicazioni',
      JSON.stringify(this.profiloService.profiloPersonale)
    );
  }
}
