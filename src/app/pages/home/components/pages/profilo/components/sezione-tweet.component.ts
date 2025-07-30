import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Profilo } from '../../../../interfaces/profilo.interface';
import { ProfiloService } from '../../../../services/profilo.service';
import { modaleApertaType } from '../types/profilo.type';

@Component({
  selector: 'app-sezione-tweet',
  standalone: true,
  imports: [DatePipe, NgTemplateOutlet],
  template: `
    <div class="mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3
          style="
              font-size: 20px;
              font-weight: bold;
              color: #0f1419;
              margin: 0;
            "
        >
          Tweet
        </h3>
        <!-- Pulsante Nuovo Tweet -->
        @if (profiloPersonale) {
        <button
          class="btn btn-primary btn-sm"
          (click)="modaleAperta.emit('new-tweet')"
          style="font-size: 14px; font-weight: bold; border-radius: 8px"
        >
          ✍️
        </button>
        }
      </div>

      @for (tweet of profilo.tweets; track $index) {
      <div class="card mb-3 border-0 shadow-sm mt-3">
        <div class="card-body" style="padding: 16px">
          <div class="d-flex align-items-start">
            @if (!profiloService.aggiornamentoPic) {

            <img
              [src]="
                profilo.user.credenziali.profilePic ||
                'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg'
              "
              alt="User"
              class="rounded-circle me-3"
              style="width: 50px; height: 50px"
            />
            } @else {
            <ng-container *ngTemplateOutlet="spinnerTemplate"></ng-container>
            }

            <div class="flex-grow-1">
              <h6 class="mb-0" style="font-size: 16px; color: #0f1419">
                {{ profilo.user.credenziali.nome }}
                <span class="text-muted" style="font-size: 14px">
                  {{ profilo.user.credenziali.email.split('@')[0] }} ·
                  {{ tweet.dataCreazione | date }}
                </span>
              </h6>
              <p class="mt-2" style="font-size: 16px; color: #0f1419">
                {{ tweet.testo }}
              </p>
            </div>

            @if (profiloPersonale) {
            <button
              class="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
              (click)="eliminaTweet.emit(tweet.id)"
              style="
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  font-size: 16px;
                  padding: 0;
                  line-height: 1;
                "
              title="Elimina tweet"
            >
              🗑️
            </button>
            }
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class SezioneTweetComponent {
  public profiloService = inject(ProfiloService);
  @Input() profilo!: Profilo;
  @Input() profiloPersonale!: boolean;
  @Input() spinnerTemplate!: TemplateRef<any>;
  @Output() eliminaTweet = new EventEmitter<number>();
  @Output() modaleAperta = new EventEmitter<modaleApertaType>();
}
