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
        {{ elemLang.titolo || 'I tuoi Elementi Miciomania' }}
      </h2>
      <p class="lead" style="color: #555">
        {{
          elemLang.descrizione1 ||
            'Qui puoi vedere il tuo manga, la tua canzone e la tua proposta inviata. Se non hai nessuna proposta in sospeso, puoi inviarne una nuova.'
        }}
        <br />
        {{
          elemLang.descrizione2 ||
            'Con una proposta puoi inviare il tuo manga o la tua canzone, se non ne hai già una associata al tuo profilo.'
        }}
      </p>
      <app-botton-custom
        [text]="elemLang.btnTornaIndietro || 'Torna indietro'"
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
