import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [],
  template: `
    <button [class]="color" (click)="clickBotton.emit()" [disabled]="disabled">
      <i [class]="icon1" class="me-2"></i>
      <span>{{ text }}</span>
      <i [class]="icon2" class="ms-2"></i>
    </button>
  `,
  styles: [
    `
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .custom-botton {
        border-radius: 30px;
        padding: 12px 24px;
        font-size: 15px;
        font-weight: 600;
        background-color: var(--surface-color);
        color: var(--text-color);
        box-shadow: 0 2px 6px var(--border-light);
        border: var(--border-light) 1px solid;

        &:hover:not(:disabled) {
          background-color: var(--primary-color);
          color: var(--bg-light);
          border-width: 2px;
          box-shadow: 0 4px 12px var(--border-light);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .primary-custom {
        background-color: var(--primary-color);
        color: var(--surface-color);
        border: none;
        border-radius: 9999px;
        padding: 12px 26px;
        font-size: 15px;
        font-weight: 600;

        &:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .secondary-custom {
        background-color: transparent;
        color: var(--primary-color);
        border: none;
        padding: 12px 26px;
        font-size: 15px;
        font-weight: 600;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      i {
        font-size: 16px;
      }
    `,
  ],
})
export class ButtonCustomComponent {
  @Input() text!: string;
  @Input() icon1: string = '';
  @Input() icon2: string = '';
  @Input() disabled: boolean = false;
  @Input() color: ButtonType = 'custom-botton';
  @Output() clickBotton = new EventEmitter<void>();
}

type ButtonType = 'custom-botton' | 'primary-custom' | 'secondary-custom';
