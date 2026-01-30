import { Component, Input, signal } from '@angular/core';
import { MN } from '../../../../../../../shared/interfaces/github.interface';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';
import { mn_imports } from './imports/m-n.import';

@Component({
  selector: 'app-m-n',
  imports: mn_imports,
  template: `
    <div class="mt-5" style="overflow-x: hidden;">
      <app-header-custom
        [titolo]="squadreLang.mnTitolo"
        [descrizione]="squadreLang.mnSottotitolo"
      ></app-header-custom>

      <div class="mt-3">
        @if (mn().length > 0) {
          <app-icone-lista
            class="pc-only"
            [classNG]="classMN()"
            [ngClass1]="'row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'"
            [ngClass2]="'d-flex flex-column gap-3 mb-5'"
            (classNGChange)="classMN.set($event)"
          ></app-icone-lista>

          <div class="row" [class]="classMN()">
            @for (mn of mn(); track $index) {
              <app-card-lettera [mn]="mn"></app-card-lettera>
            }
          </div>
        } @else {
          <app-spinner></app-spinner>
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
}
