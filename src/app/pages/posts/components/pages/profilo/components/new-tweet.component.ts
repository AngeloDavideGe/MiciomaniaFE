import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormCustomComponent } from '../../../../../../../library/components/form/form.component';
import { handlerFunc } from '../../../../../../../library/functions/handler.function';
import { RecordStruttura } from '../../../../../../../library/interfaces/form.interface';
import { DataHttp } from '../../../../../../core/api/http.data';
import { PostService } from '../../../../services/post.service';
import { Tweet } from '../../../shared/post.interface';
import { ProfiloLang } from '../languages/interfaces/profilo-lang.interface';

@Component({
  selector: 'app-new-tweet',
  standalone: true,
  imports: [FormCustomComponent],
  template: `<div
    class="position-fixed top-0 start-0 w-100 h-100 elemento-centrato"
    style="background: var(--border-hover); z-index: 1050"
  >
    <div
      class="card shadow position-relative"
      style="width: 400px; background: var(--surface-color); border-radius: 12px"
    >
      <div class="card-header text-white titolo position-relative">
        {{ profiloLang.nuovoTweet }}

        <button
          type="button"
          class="btn-close btn-close-white chiudi-modal"
          aria-label="Close"
          (click)="chiudi.emit()"
        ></button>
      </div>

      <div class="card-body" style="padding: 20px">
        <app-form-custom
          [strutturaForm]="newTweetConfig"
          (invioDati)="inviaTweet($event)"
        ></app-form-custom>
      </div>
    </div>
  </div>`,
  styles: `
    .titolo {
      background-color: var(--primary-color);
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      position: relative;
    }

    .chiudi-modal {
      position: absolute;
      top: 12px;
      right: 12px;
      transform: translateY(-50%);
    }
  `,
})
export class NewTweetComponent {
  private postService = inject(PostService);

  @Input() profiloLang!: ProfiloLang;
  @Input() idUtente!: string;
  @Output() chiudi = new EventEmitter<void>();

  public newTweetConfig: RecordStruttura = {
    descrizione: {
      titolo: 'Descrizione',
      validators: [Validators.required],
      tipo: 'Textarea',
    },
  };

  inviaTweet(params: { descrizione: string }): void {
    const tweet: Tweet = {
      id: 0,
      dataCreazione: new Date(),
      testo: params.descrizione,
      idUtente: this.idUtente,
      immaginePost: '',
    };

    handlerFunc<Tweet>({
      callHttp: () => this.postService.postPubblicazioni(tweet),
      nextCall: () => DataHttp.profiloPersonale?.tweets.unshift(tweet),
    });

    this.chiudi.emit();
  }
}
