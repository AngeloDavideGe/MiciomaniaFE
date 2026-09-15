import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-indy',
  standalone: true,
  imports: [],
  template: `
    <button
      id="button-indy"
      [style.--button-background]="backgroundColor()"
      (click)="clickButton.emit()"
      [disabled]="disabled()"
    >
      <span>{{ text() }}</span>

      <i [class]="icon()"></i>
    </button>
  `,
  styles: `
    #button-indy {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      cursor: pointer;
      background: var(--button-background);
      border: 1px solid transparent;
      border-radius: 0.75rem;
      color: var(--text);
      padding: 0.75rem 1.25rem;
      font-size: 0.95rem;
      font-weight: 600;
      transition:
        background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out,
        color 0.2s ease-in-out,
        transform 0.2s ease-in-out;

      &:hover:not(:disabled) {
        background: var(--primary-light);
        box-shadow: var(--primary-shadow);
        color: var(--background);
        transform: translateY(-2px);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
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
