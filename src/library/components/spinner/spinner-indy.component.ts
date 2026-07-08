import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-indy',
  standalone: true,
  imports: [],
  template: `
    <div
      class="elemento-centrato spinner-template-stile"
      [style]="{ 'padding-top': mt }"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
})
export class SpinnerIndyComponent {
  @Input() mt: string = '0';
}
