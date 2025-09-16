import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gruppo, LastMess } from '../../../../interfaces/chat-group.interface';
import { effectTimeoutCustom } from '../../../../../../../shared/functions/utilities.function';

@Component({
  selector: 'app-chat-all',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './chat-all.component.html',
  styleUrl: './chat-all.component.scss',
})
export class ChatAllComponent {
  @Input() allGruppi!: Gruppo[];
  @Input() allGruppiRecord!: Record<number, LastMess>;
  @Output() apriGruppo = new EventEmitter<number>();

  constructor() {
    effectTimeoutCustom(this.searchTerm, (value: string) =>
      this.debounce.set(value)
    );
  }

  public searchTerm = signal<string>('');
  private debounce = signal<string>('');

  public filteredGruppi: Signal<Gruppo[]> = computed(() => {
    const filtro: string = this.debounce();

    if (!filtro) {
      return this.allGruppi;
    } else {
      return this.allGruppi.filter((gruppo) =>
        gruppo.nome.toLowerCase().includes(filtro.toLowerCase())
      );
    }
  });
}
