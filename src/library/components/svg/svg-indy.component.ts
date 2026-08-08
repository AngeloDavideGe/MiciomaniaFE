import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { Mappa } from '../../../app/shared/interfaces/mn.interface';
import { PathSvgCustom } from '../../interfaces/svg.interface';

@Component({
  selector: 'app-svg-indy',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './svg-indy.component.html',
  styleUrl: './svg-indy.component.scss',
})
export class SvgIndyComponent {
  public colori = input<Record<string, string>>({});
  public paths = input<PathSvgCustom[]>([]);
  public viewbox = input<string>('');
  public translate = input<string>('');
  public transform = input<string>('');
  public width = input<number>(1);
  public height = input<number>(1);
  public modale = input<Mappa | null>(null);

  public pathClicked = output<string>();

  public showPopup = signal<boolean>(false);
  public popupX = signal<number>(0);
  public popupY = signal<number>(0);
  public popupText = signal<string>('');

  constructor() {
    effect(() => {
      const value: Mappa | null = this.modale();

      if (value) {
        this.popupText.set(
          `Proprietario: ${value.proprietario}\nDescrizione: ${value.descrizione}`,
        );
        this.showPopup.set(true);
      } else {
        this.popupText.set('Nessuna informazione disponibile.');
        this.showPopup.set(false);
      }
    });
  }

  public onPathClick(pathId: string, event: MouseEvent): void {
    this.pathClicked.emit(pathId);

    const svgContainer = (event.currentTarget as HTMLElement).closest(
      '.svg-container',
    ) as HTMLElement;

    if (svgContainer) {
      const containerRect = svgContainer.getBoundingClientRect();
      this.popupX.set(event.clientX - containerRect.left);
      this.popupY.set(event.clientY - containerRect.top);
    }
  }
}
