import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { modaleApertaType } from '../interfaces/profilo.interface';
import { Profilo } from '../../../../../../shared/interfaces/http.interface';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-sezione-tweet',
  standalone: true,
  imports: [DatePipe, NgTemplateOutlet],
  template: `
    <section id="SezioneTweet" class="mt-4">
      <div class="elementi-laterali">
        <h3 class="title-h3">Tweet</h3>

        @if (profiloPersonale) {
          <button
            class="btn btn-sm nuovo-tweet-btn"
            (click)="modaleAperta.emit('new-tweet')"
            title="Nuovo Tweet"
          >
            ✍️
          </button>
        }
      </div>

      @for (tweet of profilo.tweets; track $index) {
        <div class="card mb-3 border-0 shadow-sm mt-3">
          <div class="card-body" style="padding: 16px">
            <div class="elemento-iniziale">
              @if (!postService.aggiornamentoPic()) {
                <img
                  [src]="profilo.user.credenziali.profilePic || defaultPic"
                  alt="User"
                  class="rounded-circle me-3"
                  style="width: 50px; height: 50px"
                />
              } @else {
                <ng-container
                  *ngTemplateOutlet="spinnerTemplate"
                ></ng-container>
              }

              <div class="flex-grow-1">
                <h6
                  class="mb-0"
                  style="font-size: 16px; color: var(--text-color)"
                >
                  {{ profilo.user.credenziali.nome }}
                  <span style="font-size: 14px; color: var(--text-muted)">
                    {{ profilo.user.credenziali.email.split('@')[0] }} ·
                    {{ tweet.dataCreazione | date }}
                  </span>
                </h6>
                <p
                  class="mt-2"
                  style="font-size: 16px; color: var(--text-color)"
                >
                  {{ tweet.testo }}
                </p>
              </div>

              @if (profiloPersonale) {
                <button
                  class="btn btn-sm elemento-centrato elimina-tweet-btn"
                  (click)="eliminaTweet.emit(tweet.id)"
                  title="Elimina tweet"
                >
                  🗑️
                </button>
              }
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [
    `
      #SezioneTweet {
        .title-h3 {
          font-size: 20px;
          font-weight: bold;
          color: var(--text-color);
          margin: 0;
        }

        .nuovo-tweet-btn {
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          background-color: var(--primary-color);
          color: var(--surface-color);
          border: 1px solid var(--primary-color);
          transition: all 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: var(--primary-hover);
            border-color: var(--primary-hover);
            transform: translateY(-1px);
          }
        }

        .elimina-tweet-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 16px;
          padding: 9px;
          line-height: 1;
          border: 1px solid #dc3545;
          background-color: var(--surface-color);
          transition: all 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: #dc3545;
            transform: scale(1.05);
          }
        }
      }
    `,
  ],
})
export class SezioneTweetComponent {
  public postService = inject(PostService);
  public readonly defaultPic = environment.defaultPicsUrl.user;

  @Input() profilo!: Profilo;
  @Input() profiloPersonale!: boolean;
  @Input() spinnerTemplate!: TemplateRef<any>;
  @Output() eliminaTweet = new EventEmitter<number>();
  @Output() modaleAperta = new EventEmitter<modaleApertaType>();
}
