import { Component, signal } from '@angular/core';
import {
  PathSvgCustom,
  SvgCustomComponent,
} from '../../../../../../../assets/components/svg-custom.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';
import { PATH_MUSCOLI } from '../constants/path-muscoli.constant';

@Component({
  selector: 'app-allenamento',
  standalone: true,
  imports: [SvgCustomComponent, SpinnerComponent],
  template: `
    <div id="ContainerMuscle">
      @if (loading()) {
        <app-spinner [mt]="'5rem'"></app-spinner>
      } @else {
        <div style="">
          <div class="elemento-centrato" style="margin-top: 4rem;">
            <app-svg-custom
              [paths]="paths"
              [viewbox]="'0 0 700 1200'"
              [translate]="'translate(0, -60)'"
              [width]="500"
              [height]="700"
            ></app-svg-custom>
          </div>
        </div>
      }
    </div>
  `,
  styles: [``],
})
export class AllenamentoComponent {
  public readonly paths: PathSvgCustom[] = PATH_MUSCOLI;
  public loading = signal<boolean>(false);
}
