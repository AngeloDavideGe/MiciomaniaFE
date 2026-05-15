import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal-custom',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalCustomComponent implements OnInit {
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

  @Output() close = new EventEmitter<void>();
  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();

  ngOnInit(): void {
    this.modalWidth = `modal-${this.width}`;
  }
}
