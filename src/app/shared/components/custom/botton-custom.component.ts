import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botton-custom',
  standalone: true,
  imports: [],
  template: `
    <button
      class="btn btn-outline-secondary d-inline-flex align-items-center"
      #btn
      [style]="
        'border-radius: 30px; padding: 10px 20px; background-color: ' +
        color +
        '; color: black; border-width: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); transition: all 0.2s ease-in-out;'
      "
      (mouseover)="
        btn.style.boxShadow = '0 4px 12px ' + color;
        btn.style.transform = 'scale(1.05)'
      "
      (mouseout)="
        btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
        btn.style.transform = 'scale(1)'
      "
      (click)="clickBotton.emit()"
      [disabled]="disabled"
    >
      <i [class]="icon1" style="margin-right: 8px;"></i>
      <span>{{ text }}</span>
      <i [class]="icon2" style="margin-left: 8px;"></i>
    </button>
  `,
})
export class BottonCustomComponent {
  @Input() text!: string;
  @Input() icon1: string = '';
  @Input() icon2: string = '';
  @Input() color: string = '#f8f9fa';
  @Input() disabled: boolean = false;
  @Output() clickBotton = new EventEmitter<void>();
}
