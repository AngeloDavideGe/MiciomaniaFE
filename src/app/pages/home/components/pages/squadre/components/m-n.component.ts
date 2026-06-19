import { Component, Input, signal } from '@angular/core';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';
import {
  iTab,
  TabsComponent,
} from '../../../../../../../library/components/tabs/tabs.component';
import { MN } from '../../../../../../shared/interfaces/squadre.interface';

@Component({
  selector: 'app-m-n',
  imports: [SpinnerComponent, TabsComponent],
  template: `
    <div>
      <div class="mt-3">
        @if (mn().length > 0) {
          <app-tabs-custom
            [tabs]="tabs"
            [tipo]="'lista'"
            (clickTab)="classMN.set($event)"
          ></app-tabs-custom>

          <div class="row" [class]="classMN()">
            @for (mn of mn(); track mn.valore) {
              <div class="col">
                <div
                  class="card h-100 border-0 rounded-4 shadow-lg-hover transition-all"
                  style="transition: all 0.3s ease"
                  [style.borderLeft]="'5px solid ' + mn.colore"
                >
                  <div class="card-body p-4">
                    <div class="elemento-iniziale gap-3 mb-3">
                      <span
                        class="badge rounded-pill p-2 elemento-centrato"
                        [style.backgroundColor]="mn.colore"
                        style="
                          color: white;
                          font-size: 0.8rem;
                          min-width: 36px;
                          height: 36px;
                        "
                      >
                        {{ mn.valore }}
                      </span>
                      <h5
                        class="card-title mb-0 flex-grow-1"
                        style="font-weight: 600; color: #2c3e50"
                      >
                        {{ mn.descrizione }}
                      </h5>
                    </div>

                    <div
                      class="p-3 mb-3 rounded-3"
                      [style.backgroundColor]="mn.colore + '15'"
                      [style.borderLeft]="'3px solid ' + mn.colore"
                    >
                      <p class="mb-0" style="font-size: 0.9rem">
                        <strong style="color: #2c3e50">Consiglio:</strong>
                        <span style="color: #7f8c8d">{{ mn.consiglio }}</span>
                      </p>
                    </div>

                    <div>
                      <h6
                        class="mb-3"
                        style="font-size: 0.9rem; color: #7f8c8d; font-weight: 500"
                      >
                        Esempi caratteristici:
                      </h6>
                      <ul class="list-group list-group-flush border-0">
                        @for (esempio of mn.esempi; track $index) {
                          <li
                            class="list-group-item border-0 px-0 py-2 bg-transparent"
                            style="font-style: italic; color: #34495e; font-size: 0.9rem"
                          >
                            <i
                              class="bi bi-chat-square-quote me-2"
                              [style.color]="mn.colore"
                            ></i>
                            "{{ esempio }}"
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <app-spinner [mt]="'5rem'"></app-spinner>
        }
      </div>
    </div>
  `,
})
export class MNComponent {
  public classMN = signal<string>('row-cols-1 row-cols-md-2 row-cols-lg-3 g-4');
  public mn = signal<MN[]>([]);

  @Input() set setMN(value: MN[]) {
    this.mn.set(value);
  }

  public readonly tabs: iTab[] = [
    {
      id: 'row-cols-1 row-cols-md-2 row-cols-lg-3 g-4',
      icona: 'bi bi-grid',
    },
    {
      id: 'elementi-colonna gap-3 mb-5',
      icona: 'bi bi-list',
    },
  ];
}
