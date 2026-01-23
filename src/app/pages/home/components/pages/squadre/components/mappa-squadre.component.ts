import { Component } from '@angular/core';
import { MappaItaliaComponent } from '../../../../../../../assets/components/italia.component';

@Component({
  selector: 'app-mappa-squadre',
  standalone: true,
  imports: [MappaItaliaComponent],
  template: `
    <div>
      <app-mappa-italia />
    </div>
  `,
  styles: [``],
})
export class MappaSquadreComponent {}
