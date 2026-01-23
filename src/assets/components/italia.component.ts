import { Component } from '@angular/core';
import { PATH_REGIONI, PathRegione } from '../constants/path-regioni.constant';

@Component({
  selector: 'app-mappa-italia',
  template: `
    <svg
      baseprofile="tiny"
      fill="#f8f9fa"
      height="1000"
      stroke="#4a5568"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.2"
      version="1.2"
      viewbox="0 0 1000 1000"
      width="1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="features">
        @for (path of paths; track $index) {
          <path [attr.d]="path.d" [attr.id]="path.id">
            <title>{{ path.title }}</title>
          </path>
        }
      </g>
    </svg>
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
    `,
  ],
})
export class MappaItaliaComponent {
  public paths: PathRegione[] = PATH_REGIONI;
}
