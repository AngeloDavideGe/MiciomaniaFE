import { Component } from '@angular/core';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [],
  template: `
    <div
      class="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style="background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%); padding: 2rem;"
    >
      <div class="w-100" style="max-width: 700px;">
        <div class="card shadow-lg border-0 rounded-4 p-4 mb-4">
          <h1 class="display-5 text-primary fw-bold mb-3 text-center">
            Iscrizione al Corso di Formazione
          </h1>
          <p
            class="lead text-secondary mb-4 text-center"
            style="font-size: 1.2rem;"
          >
            Benvenuti al corso di formazione per diventare un vero uomo
            umiliatore. Qui imparerete le tecniche più avanzate per umiliare le
            donne e affermare la vostra superiorità.
          </p>
        </div>

        <section class="mb-4">
          <h4 class="h4 text-dark fw-bold mb-3 text-center">
            Scegliete il vostro team
            <span class="text-muted" style="font-size:1rem;"
              >(Anche entrambi)</span
            >:
          </h4>
          <div class="row g-4 justify-content-center">
            <!-- Team Alcamo -->
            <div class="col-12 col-md-6">
              <div
                class="card border-danger border-2 rounded-4 h-100 shadow-sm"
              >
                <div class="card-body">
                  <h4 class="h4 text-danger fw-bold mb-2 text-center">
                    Alcamo patria inestimabile
                  </h4>
                  <p class="text-secondary mb-0 text-center">
                    Qui è dove nacque la più grande fondatrice del movimento
                    anti uomo, la nobile Claudia che col suo midollo osseo vuole
                    epurare la società e creare un posto felice per tutte le
                    donne.
                  </p>
                </div>
              </div>
            </div>
            <!-- Team Miciomania -->
            <div class="col-12 col-md-6">
              <div
                class="card border-success border-2 rounded-4 h-100 shadow-sm"
              >
                <div class="card-body">
                  <h4 class="h4 text-success fw-bold mb-2 text-center">
                    Miciomania gruppo dei derisori
                  </h4>
                  <p class="text-secondary mb-0 text-center">
                    Qui risiedono i 2 membri fondatori Indy e Punty che con il
                    loro terzo micio Segny (Allevato da Justocchi) stanno
                    spopolando in tutto il mondo per la loro derisione.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white p-4 rounded-4 shadow-lg mt-4">
          <h2 class="h4 text-primary fw-bold mb-4 text-center">
            Pro e Contro delle Squadre
          </h2>
          <div class="row g-4">
            <!-- Pro e contro Alcamo -->
            <div class="col-12 col-md-4">
              <div class="border-start border-danger ps-3 h-100">
                <h5 class="text-danger fw-bold mb-2">Alcamo</h5>
                <p class="text-secondary mb-0" style="font-size: 1rem;">
                  Avrete numerose donzelle ai vostri piedi perché attratte da
                  esseri superiori come voi, ma sarete entrambe delle donne e
                  quindi potrete solo sforbiciare.
                </p>
              </div>
            </div>
            <!-- Pro e contro Miciomania -->
            <div class="col-12 col-md-4">
              <div class="border-start border-success ps-3 h-100">
                <h5 class="text-success fw-bold mb-2">Miciomania</h5>
                <p class="text-secondary mb-0" style="font-size: 1rem;">
                  Sarete odiati dalle donne in quanto ritenuti offensivi e
                  mostruosi, ma il vostro potere eccederà alle stelle facendo
                  piangere le allieve di Claudia che detestate.
                </p>
              </div>
            </div>
            <!-- Pro e contro Entrambe le Squadre -->
            <div class="col-12 col-md-4">
              <div class="border-start border-primary ps-3 h-100">
                <h5 class="text-primary fw-bold mb-2">Entrambe le Squadre</h5>
                <p class="text-secondary mb-0" style="font-size: 1rem;">
                  Sarete esseri invincibili, con la forza di un uomo umiliatore
                  e avrete tutte le donzelle ai vostri piedi, ma Claudia non
                  sarà mai certa al 100% della vostra alleanza e tenterà di
                  tradirvi in quanto maschi etero basic.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      h4,
      h5 {
        font-size: 1.5rem;
        font-weight: bold;
      }
      @media (max-width: 767px) {
        .card {
          padding: 1rem !important;
        }
        h1,
        .display-5 {
          font-size: 2rem !important;
        }
      }
    `,
  ],
})
export class Step1Component {}
