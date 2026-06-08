import { Component, Input, signal } from '@angular/core';
import { MN } from '../../../../../../../shared/interfaces/github.interface';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';
import { mn_imports } from './imports/m-n.import';
import { iTab } from '../../../../../../../../library/components/tabs/tabs.component';

@Component({
  selector: 'app-m-n',
  imports: mn_imports,
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
              <app-card-lettera [mn]="mn"></app-card-lettera>
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

  @Input() squadreLang!: SquadreLang;
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
