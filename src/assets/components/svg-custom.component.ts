import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Mappa } from '../../app/shared/interfaces/github.interface';

@Component({
  selector: 'app-svg-custom',
  template: `
    <div
      class="svg-container"
      style="position: relative; display: inline-block;"
    >
      <svg
        baseprofile="tiny"
        [attr.height]="height"
        [attr.width]="width"
        stroke="#4a5568"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.2"
        version="1.2"
        [attr.viewBox]="'0 0 ' + width + ' ' + height"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g [attr.transform]="translate">
          <g id="features">
            @for (path of paths; track $index) {
              <path
                [attr.d]="path.d"
                [attr.id]="path.title"
                [attr.fill]="colori[path.title] || '#e2e5e8'"
                (click)="onPathClick(path.title, $event)"
              >
                <title>{{ path.title }}</title>
              </path>
            }
          </g>
        </g>
      </svg>

      @if (showPopup()) {
        <div class="popup" [style.left.px]="popupX" [style.top.px]="popupY">
          <button (click)="showPopup.set(false)" class="close-btn">×</button>
          <pre>{{ popupText }}</pre>
        </div>
      }
    </div>
  `,
  styles: [
    `
      g {
        path {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;

          &:hover {
            filter: brightness(0.85) saturate(1.1);
            stroke-width: 1.5;
          }
        }
      }

      .popup {
        position: absolute;
        background: white;
        border: 2px solid #007bff;
        border-radius: 4px;
        padding: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        min-width: 200px;
        transform: translate(10px, 10px);

        .close-btn {
          position: absolute;
          top: 2px;
          right: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        pre {
          margin: 0;
          font-size: 12px;
          white-space: pre-wrap;
        }
      }
    `,
  ],
})
export class SvgCustomComponent {
  @Input() colori: Record<string, string> = {};
  @Input() paths: PathSvgCustom[] = [];
  @Input() translate: string = '';
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

export interface PathSvgCustom {
  title: string;
  d: string;
}
