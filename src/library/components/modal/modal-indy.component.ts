import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonIndyComponent } from '../button/button-indy.component';

@Component({
  selector: 'app-modal-indy',
  standalone: true,
  imports: [ButtonIndyComponent],
  templateUrl: './modal-indy.component.html',
  styleUrl: './modal-indy.component.scss',
})
export class ModalIndyComponent implements OnInit {
  public modalWidth: string = 'modal-md';

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() width: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen' = 'md';
  @Input() showFooter: boolean = false;
  @Input() showBody: boolean = true;
  @Input() primaryButtonText: string = 'Conferma';
  @Input() secondaryButtonText: string = 'Annulla';
  @Input() centered: boolean = true;
  @Input() blurBackdrop: boolean = true;
  @Input() disablePrimaryButton: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();

  ngOnInit(): void {
    this.modalWidth = `modal-${this.width}`;
  }
}
