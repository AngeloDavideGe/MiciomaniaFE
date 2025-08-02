import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botton-custom',
  standalone: true,
  imports: [],
  template: `
    <button
      class="btn btn-outline-secondary"
      style="border-radius: 20px; padding: 8px 16px"
      (click)="clickBotton.emit()"
    >
      <i [class]="icon"></i>
      {{ text }}
    </button>
  `,
  styles: [``],
})
export class BottonCustomComponent {
  @Output() clickBotton = new EventEmitter<void>();
  @Input() text!: string;
  @Input() icon!: string;
}
