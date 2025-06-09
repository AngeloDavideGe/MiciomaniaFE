import { Component } from '@angular/core';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [],
  template: `
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        text-align: center;
        padding: 30px;
      "
    >
      <div>
        <h1 class="display-4 text-primary font-weight-bold mb-4">
          Iscrizione al Corso di Formazione
        </h1>
        <p class="lead text-secondary" style="margin-top: 0.3rem;">
          Benvenuti al corso di formazione per diventare un vero uomo
          umiliatore. Qui imparerete le tecniche più avanzate per umiliare le
          donne e affermare la vostra superiorità.
        </p>

        <section>
          <h4 class="h4 text-dark font-weight-bold mb-3 mt-3">
            Scegliete il vostro team (Anche entrambi):
          </h4>

          <!-- Team Alcamo -->
          <div
            class="d-flex flex-wrap align-items-center justify-content-center mb-4 gap-3 mt-4"
          >
            <div class="flex-grow-1" style="max-width: 40rem;">
              <h4 class="h4 text-danger font-weight-bold mb-2">
                Alcamo patria inestimabile
              </h4>
              <p class="text-secondary">
                Qui è dove nacque la più grande fondatrice del movimento anti
                uomo, la nobile Claudia che col suo midollo osseo vuole epurare
                la società e creare un posto felice per tutte le donne.
              </p>
            </div>
            <div class="flex-grow-1" style="max-width: 40rem;">
              <img
                src="https://www.vivasicilia.com/wp-content/uploads/2019/06/comune_alcamo.jpg"
                alt="Alcamo"
                class="img-fluid rounded border border-danger"
              />
            </div>
          </div>

          <!-- Team Miciomania -->
          <div
            class="d-flex flex-wrap align-items-center justify-content-center mb-4 gap-3"
          >
            <div class="flex-grow-1" style="max-width: 40rem;">
              <h4 class="h4 text-success font-weight-bold mb-2">
                Miciomania gruppo dei derisori
              </h4>
              <p class="text-secondary">
                Qui risiedono i 2 membri fondatori Indy e Punty che con il loro
                terzo micio Segny (Allevato da Justocchi) stanno spopolando in
                tutto il mondo per la loro derisione.
              </p>
            </div>
            <div class="flex-grow-1" style="max-width: 40rem;">
              <img
                src="https://cuccioletti.it/cdn/shop/articles/gatti-che-miagolano-possibili-motivi-cosa-vogliono-perche_900x.jpg?v=1648459503"
                alt="Miciomania"
                class="img-fluid rounded border border-success"
              />
            </div>
          </div>
        </section>

        <section class="bg-white p-4 rounded shadow mt-4">
          <h2 class="h2 text-primary font-weight-bold mb-3">
            Pro e Contro delle Squadre
          </h2>

          <!-- Pro e contro Alcamo -->
          <div class="mb-4">
            <h4 class="h4 text-danger font-weight-bold mb-2">Alcamo</h4>
            <p class="text-secondary">
              Avrete numerose donzelle ai vostri piedi perchè attratte da esseri
              superiori come voi, ma sarete entrambe delle donne e quindi
              potrete solo sforbiciare.
            </p>
          </div>

          <!-- Pro e contro Miciomania -->
          <div class="mb-4">
            <h4 class="h4 text-success font-weight-bold mb-2">Miciomania</h4>
            <p class="text-secondary">
              Sarete odiati dalle donne in quanto ritenuti offensivi e
              mostruosi, ma il vostro potere eccederà alle stelle facendo
              piangere le allieve di Claudia che detestate.
            </p>
          </div>

          <!-- Pro e contro Entrambe le Squadre -->
          <div>
            <h4 class="h4 text-purple font-weight-bold mb-2">
              Entrambe le Squadre
            </h4>
            <p class="text-secondary">
              Sarete esseri invincibili, con la forza di un uomo umiliatore e
              avrete tutte le donzelle ai vostri piedi, ma Claudia non sarà mai
              certa al 100% della vostra alleanza e tenterà di tradirvi in
              quanto maschi etero basic.
            </p>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      h4 {
        font-size: 2.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        margin-top: 1.5rem;
      }
    `,
  ],
})
export class Step1Component {}
