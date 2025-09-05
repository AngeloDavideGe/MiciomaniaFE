import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BottonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';
import { ElemLang } from '../languages/interfaces/elem-lang.interface';

@Component({
  selector: 'app-header-elementi',
  standalone: true,
  imports: [BottonCustomComponent],
  template: `
    <div class="text-center mb-4">
      <h2 class="fw-bold" style="color: #2d8659">
        {{ elemLang.titolo }}
      </h2>
      <p class="lead" style="color: #555">
        {{ elemLang.descrizione1 }}
        <br />
        {{ elemLang.descrizione2 }}
      </p>
      <app-botton-custom
        [text]="elemLang.btnTornaIndietro"
        [icon1]="'bi bi-arrow-left'"
        (clickBotton)="router.navigate(['/home'])"
      ></app-botton-custom>
      <hr
        style="
        width: 60px;
        border: 2px solid #2d8659;
        opacity: 1;
        margin: 1.5rem auto;
      "
      />
    </div>
  `,
})
export class HeaderElementiComponent {
  public router = inject(Router);
  @Input() elemLang!: ElemLang;
}
