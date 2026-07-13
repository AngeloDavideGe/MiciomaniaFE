import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-container-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-micio" [style]="{ background: background() }">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .container-micio {
      width: calc(100% - 4rem);
      margin-inline: 2rem;
      border: 1px solid var(--border);
      border-radius: 1.25rem;
      box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.25);
      transition: all 0.25s ease;
    }
  `,
})
export class ContaierMicioComponent {
  public background = input<string>('var(--card)');
}
