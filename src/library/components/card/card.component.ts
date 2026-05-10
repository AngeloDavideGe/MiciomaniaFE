import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { iCard } from '../../interfaces/card.interface';
import { Router } from '@angular/router';
import { FiltriInterface } from '../../interfaces/pagination.interface';
import { GetFiltriCustom } from '../../functions/pagination.function';
import { PaginazioneCustomComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-card-custom',
  standalone: true,
  imports: [PaginazioneCustomComponent],
  template: `
    <app-paginazione-custom
      [filtri]="filtri"
      [tipo]="'singolo'"
    ></app-paginazione-custom>

    <div class="grid-card-layout" style="--card-width: {{ lunghezzaCard }}">
      @for (elem of filtri.elemFilter(); track elem.titolo) {
        <div class="card h-100" [style]="{ width: lunghezzaCard }">
          @if (elem.urlPic) {
            <img
              [src]="elem.urlPic"
              [style]="{ height: altezzaImg }"
              class="card-img-top object-fit-cover"
            />
          }

          <div class="card-body d-flex flex-column" [class]="classBody">
            <h5 class="fw-bold">
              {{ elem.titolo }}
            </h5>

            @if (elem.descrizione) {
              <div class="card-text" [innerHTML]="elem.descrizione"></div>
            }

            @if (elem.bottone) {
              <button
                class="btn btn-primary mt-auto"
                (click)="clickButton($index)"
              >
                {{ elem.bottone }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .card {
        height: 100%;
      }

      .card-text {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class CardCustomComponent implements OnInit {
  public router = inject(Router);

  public filtri: FiltriInterface<iCard> = {} as FiltriInterface<iCard>;

  @Input() elems!: WritableSignal<iCard[]>;
  @Input() lunghezzaCard: string = '20rem';
  @Input() altezzaImg: string = '20rem';
  @Input() classBody: string = '';
  @Input() elemForPage = signal<number>(4);

  public clickButton(index: number): void {
    if (this.elems()[index].routerLink) {
      this.router.navigate([this.elems()[index].routerLink]);
    } else if (this.elems()[index].azione) {
      this.elems()[index].azione!();
    }
  }

  ngOnInit(): void {
    this.filtri = GetFiltriCustom<iCard, null>({
      elemTable: this.elems,
      elemForPage: this.elemForPage,
    });
  }
}
