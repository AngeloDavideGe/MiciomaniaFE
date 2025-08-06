import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';

@Component({
  selector: 'app-header-mn',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <div class="d-flex justify-content-between align-items-center">
      <app-botton-custom
        [text]="'Torna indietro'"
        [icon1]="'bi bi-arrow-left'"
        (clickBotton)="router.navigate(['/home'])"
      ></app-botton-custom>

      <h2
        class="text-center mb-0 display-5 fw-bold"
        style="font-family: 'Inter', sans-serif; color: #2c3e50; flex-grow: 1"
      >
        Classifica MN
      </h2>

      <!-- Spaziatura bilanciata -->
    </div>
  `,
})
export class HeaderMNComponent {
  public router = inject(Router);
}
