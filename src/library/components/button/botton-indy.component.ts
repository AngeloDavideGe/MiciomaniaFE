import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-indy',
  standalone: true,
  imports: [],
  template: `
    <button
      [class]="color()"
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
    }

    .custom-button {
      background: var(--primary);
      color: var(--text);
      border: 1px solid transparent;
      box-shadow: 0 4px 12px rgba(138, 77, 255, 0.25);

      &:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-1px);
      }
    }

    i {
      font-size: 1rem;
      transition: transform 0.2s ease-in-out;
    }

    button:hover:not(:disabled) i {
      transform: translateX(3px);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
})
export class ButtonIndyComponent {
  public text = input.required<string>();
  public icon = input<string>('bi bi-chevron-right');
  public disabled = input<boolean>(false);
  public color = input<ButtonType>('custom-button');
  public clickButton = output<void>();
}

type ButtonType = 'custom-button';
