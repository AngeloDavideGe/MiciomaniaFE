import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <div
      class="d-flex justify-content-center align-items-center spinner-template-stile"
      [style]="{ 'margin-top': mt }"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input() mt: string = '0';
}
