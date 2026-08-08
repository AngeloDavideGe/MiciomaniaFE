import {
  Component,
  computed,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ButtonIndyComponent } from '../button/button-indy.component';

@Component({
  selector: 'app-modal-indy',
  standalone: true,
  imports: [ButtonIndyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-indy.component.html',
  styleUrl: './modal-indy.component.scss',
})
export class ModalIndyComponent {
  public title = input<string>('');
  public subtitle = input<string>('');
  public width = input<'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'>('md');
  public showFooter = input<boolean>(false);
  public showBody = input<boolean>(true);
  public primaryButtonText = input<string>('Conferma');
  public secondaryButtonText = input<string>('Annulla');
  public centered = input<boolean>(true);
  public blurBackdrop = input<boolean>(true);
  public disablePrimaryButton = input<boolean>(false);

  public close = output<void>();
  public primaryAction = output<void>();
  public secondaryAction = output<void>();

  public modalWidth = computed(() => `modal-${this.width()}`);
}
