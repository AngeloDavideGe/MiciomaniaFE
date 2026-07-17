import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Mappa } from '../../../app/shared/interfaces/mn.interface';
import { PathSvgCustom } from '../../interfaces/svg.interface';

@Component({
  selector: 'app-svg-indy',
  imports: [],
  standalone: true,
  templateUrl: './svg-indy.component.html',
  styleUrl: './svg-indy.component.scss',
})
export class SvgIndyComponent {
  @Input() colori: Record<string, string> = {};
  @Input() paths: PathSvgCustom[] = [];
  @Input() viewbox: string = '';
  @Input() translate: string = '';
  @Input() transform: string = '';
  @Input() width: number = 1;
  @Input() height: number = 1;
  @Input() set modale(value: Mappa | null) {
    if (value) {
      this.popupText = `Proprietario: ${value.proprietario}\nDescrizione: ${value.descrizione}`;
      this.showPopup.set(true);
    } else {
      this.popupText = 'Nessuna informazione disponibile.';
      this.showPopup.set(false);
    }
  }
  @Output() pathClicked = new EventEmitter<string>();

  public showPopup = signal<boolean>(false);
  public popupX = 0;
  public popupY = 0;
  public popupText = '';

  onPathClick(pathId: string, event: MouseEvent) {
    this.pathClicked.emit(pathId);

    const svgContainer = (event.currentTarget as HTMLElement).closest(
      '.svg-container',
    ) as HTMLElement;

    if (svgContainer) {
      const containerRect = svgContainer.getBoundingClientRect();
      this.popupX = event.clientX - containerRect.left;
      this.popupY = event.clientY - containerRect.top;
    }
  }
}
