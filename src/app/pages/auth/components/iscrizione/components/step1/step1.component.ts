import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { WizardService } from '../../../../services/wizard.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [],
  template: `
    <div
      class="d-flex flex-column align-items-center min-vh-70"
      style="background: #f9fafb; padding: 2rem;"
    >
      <div class="w-100" style="max-width: 900px;">
        <!-- INTRO -->
        <header class="text-center mb-5">
          <h1
            class="fw-bold text-dark mb-3"
            style="font-size: 2rem; letter-spacing: -0.5px;"
          >
            Iscrizione al Corso di Formazione
          </h1>
          <p
            class="text-secondary"
            style="font-size: 1.1rem; line-height: 1.6; max-width: 650px; margin: 0 auto;"
          >
            Benvenuti! Scegliete la vostra squadra e scoprite i pro e contro che
            vi accompagneranno durante il percorso di crescita e apprendimento.
          </p>
        </header>

        <!-- SQUADRE -->
        <section>
          <h2
            class="fw-bold text-primary text-center mb-4"
            style="font-size: 1.4rem;"
          >
            Pro e Contro delle Squadre
          </h2>

          <div class="row g-4">
            @for (squadra of team; track $index; let i = $index) {
            <div class="col-12 col-md-4">
              <div
                class="d-flex flex-column h-100 p-3 rounded-3 shadow-sm"
                style="background: #ffffff; border: 1px solid #e5e7eb;"
              >
                <div class="d-flex align-items-center mb-2">
                  <div
                    class="rounded-circle me-2"
                    [style.background]="colori[i].toLowerCase()"
                    style="width: 14px; height: 14px;"
                  ></div>
                  <h5
                    class="fw-semibold mb-0"
                    style="font-size: 1.05rem;"
                    [style.color]="colori[i].toLowerCase()"
                  >
                    {{ squadra }}
                  </h5>
                </div>
                <p
                  class="text-secondary mb-0"
                  style="font-size: 0.95rem; line-height: 1.5;"
                >
                  {{ descrizioni[i] || '... caricamento' }}
                </p>
              </div>
            </div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
})
export class Step1Component implements OnInit {
  private wizardService = inject(WizardService);

  public team: string[] = environment.team;
  public colori: string[] = environment.colori;
  public descrizioni: string[] = [];

  ngOnInit(): void {
    this.wizardService
      .getDescrizioniSquadre()
      .pipe(take(1))
      .subscribe({
        next: (descrizioni: string[]) => (this.descrizioni = descrizioni),
        error: (err) =>
          console.error('Errore recupero descrizioni squadre', err),
      });
  }
}
