import { Component, Input } from '@angular/core';
import { SezioneScroll } from '../../interfaces/scroll.interface';

@Component({
  selector: 'app-custom-scroll',
  standalone: true,
  imports: [],
  template: `
    @for (sezione of sezioni; track sezione.id) {
      <section [id]="sezione.id" class="mb-5">
        <div class="elementi-laterali mb-2">
          <h2 class="px-2" style="color: var(--text-color);">
            <i class="bi bi-person-circle me-2"></i>
            {{ sezione.titolo }}
            <span
              class="badge ms-2"
              style="background-color: #198754; color: white;"
            >
              {{ sezione.lunghezza }}
            </span>
          </h2>

          <div class="d-flex gap-2">
            <button
              class="btn btn-sm"
              (click)="scrollToNextSection($index)"
              style="
                border: 1px solid var(--border-color);
                color: var(--text-color);
                background-color: var(--surface-color);
              "
            >
              <i class="me-1" [class]="sezione.icona"></i>
              {{ sezione.nomeIcona }}
            </button>
          </div>
        </div>

        @switch ($index) {
          @case (0) {
            <ng-content select="[primo]"></ng-content>
          }
          @case (1) {
            <ng-content select="[secondo]"></ng-content>
          }
          @case (2) {
            <ng-content select="[terzo]"></ng-content>
          }
          @case (3) {
            <ng-content select="[quarto]"></ng-content>
          }
          @case (4) {
            <ng-content select="[quinto]"></ng-content>
          }
        }
      </section>
    }
  `,
})
export class ScrollCustomComponent {
  @Input({ required: true })
  sezioni: SezioneScroll[] = [];

  scrollToNextSection(index: number): void {
    const nextSection = this.sezioni[index + 1];

    if (!nextSection) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    const element = document.getElementById(nextSection.id);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
