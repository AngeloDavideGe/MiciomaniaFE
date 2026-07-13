import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-indy',
  standalone: true,
  imports: [],
  template: `
    <button
      [style]="{ background: backgroundColor() }"
      (click)="clickButton.emit()"
      [disabled]="disabled()"
    >
      <span>{{ text() }}</span>

      <i [class]="icon()"></i>
    </button>
  `,
  styles: `
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      border-radius: 0.75rem;
      padding: 0.75rem 1.25rem;
      font-size: 0.95rem;
      font-weight: 600;

      &:hover {
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      i {
        font-size: 1rem;
        transition: transform 0.2s ease-in-out;
      }

      &:hover:not(:disabled) i {
        transform: translateX(3px);
      }
    }
  `,
})
export class ButtonIndyComponent {
  public text = input.required<string>();
  public icon = input<string>('bi bi-chevron-right');
  public disabled = input<boolean>(false);
  public backgroundColor = input<string>('var(--primary)');
  public clickButton = output<void>();
}
