import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataHttp } from '../../../../../../../core/api/http.data';
import { formatDataCustom } from '../../../../../../../shared/functions/utilities.function';
import { postPubblicazioni } from '../../../../../handlers/profilo.handler';
import { Tweet } from '../../../../../interfaces/profilo.interface';
import { ProfiloService } from '../../../../../services/profilo.service';
import { ProfiloLang } from '../../languages/interfaces/profilo-lang.interface';

@Component({
  selector: 'app-new-tweet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-tweet.component.html',
})
export class NewTweetComponent {
  public nuovoTweet: any;
  public testo: string = '';
  private profiloService = inject(ProfiloService);

  @Input() profiloLang!: ProfiloLang;
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
    postPubblicazioni({
      profiloService: this.profiloService,
      tweet: tweet,
      nextCall: () => DataHttp.profiloPersonale?.tweets.unshift(tweet),
    });
  }
}
