import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-container-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-micio" [class.hover]="hover()">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .container-micio {
      width: calc(100% - 2rem);
      margin-inline: 1rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1.25rem;
      padding: 1.25rem;
      backdrop-filter: blur(20px);
      box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.25);
      transition: all 0.25s ease;

      &.hover:hover {
        background: var(--card-light);
        border-color: var(--primary);
        box-shadow: var(--primary-shadow);
        transform: translateY(-2px);
      }
    }
  `,
})
export class ContaierMicioComponent {
  public hover = input<boolean>(false);
}
