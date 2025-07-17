import { Component, Input } from '@angular/core';
import { User } from '../../../../../../shared/interfaces/users.interface';

@Component({
  standalone: true,
  selector: 'app-success-page',
  template: `
    <div
      class="container text-center mt-5 px-3 px-md-4 px-lg-5"
      style="padding-top: 0rem; padding: 3rem"
    >
      <h1 style="color: green; font-size: 3rem;">Operazione Completata!</h1>
      <p style="font-size: 1.5rem;">
        La tua iscrizione è avvenuta con successo. Ecco i dettagli:
      </p>

      <!-- Card -->
      <div
        class="card mx-auto mt-4 w-75 w-md-85 w-lg-90"
        style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      >
        <div class="card-body">
          <h5 class="card-title" style="color: #007bff; font-size: 2rem;">
            Dettagli Utente
          </h5>
          <ul class="list-group list-group-flush text-start">
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>ID Utente:</strong>
              {{ user.id || 'Non disponibile' }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Nome:</strong> {{ user.credenziali.nome }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Email:</strong> {{ user.credenziali.email }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Stato:</strong> {{ user.iscrizione.stato }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Team:</strong> {{ user.iscrizione.team }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Provincia:</strong>
              {{ user.iscrizione.provincia || 'Non disponibile' }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Città:</strong>
              {{ user.iscrizione.citta || 'Non disponibile' }}
            </li>
            <li class="list-group-item" style="font-size: 1.25rem;">
              <strong>Punteggio:</strong>
              {{ user.iscrizione.punteggio || 'Non disponibile' }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Button Container -->
      <div class="d-flex justify-content-center gap-3 mt-4">
        <button
          class="btn btn-primary stile-bottoni"
          (click)="navigateToHome()"
          onmouseover="this.style.transform='scale(1.05)';"
          onmouseout="this.style.transform='scale(1)';"
        >
          🏠 Torna alla Home
        </button>

        <button
          class="btn btn-outline-primary stile-bottoni"
          (click)="editInfo()"
          onmouseover="this.style.transform='scale(1.05)';"
          onmouseout="this.style.transform='scale(1)';"
        >
          ✏️ Modifica Info
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .stile-bottoni {
        font-size: 1.25rem;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
      }
    `,
  ],
})
export class SuccessPageComponent {
  @Input() user: User = {} as User;
  @Input() navigateToHome!: () => any;
  @Input() editInfo!: () => any;
}
