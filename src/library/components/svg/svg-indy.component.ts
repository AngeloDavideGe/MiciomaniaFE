import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { PathSvgCustom, Mappa } from '../../interfaces/svg.interface';

@Component({
  selector: 'app-svg-indy',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './svg-indy.component.html',
  styleUrl: './svg-indy.component.scss',
})
export class SvgIndyComponent {
  public paths = input.required<PathSvgCustom[]>();
  public colori = input<Record<string, string>>({});
  public viewbox = input<string>('');
  public translate = input<string>('');
  public transform = input<string>('');
  public width = input<number>(200);
  public height = input<number>(200);
  public modale = model<Mappa | null>(null);

  public pathClicked = output<string>();

  public popupX = signal<number>(0);
  public popupY = signal<number>(0);

  public onPathClick(path: PathSvgCustom, event: MouseEvent): void {
    this.pathClicked.emit(path.title);
    path.click?.();

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
