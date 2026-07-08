import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CheckBoxIndyComponent } from '../../../../../../library/components/checkbox/checkbox-indy.component';
import { ICheckBox } from '../../../../../../library/interfaces/form.interface';
import { User } from '../../../../../shared/interfaces/users.interface';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, CheckBoxIndyComponent],
  template: `
    <div class="card shadow-lg border-0 mb-4" style="border-radius: 12px">
      <div
        class="card-header text-white"
        style="background: linear-gradient(90deg, #0d6efd, #0b5ed7)"
      >
        <h5 class="mb-0 fs-4">Riepilogo Dati Utente</h5>
      </div>

      <div class="card-body p-4" style="background-color: #f8f9fa">
        <div class="row g-4">
          <div class="col-12">
            <div class="text-center">
              <h4 class="mt-3 mb-1">
                {{ user.credenziali.nome }}
              </h4>

              <span class="badge bg-primary">
                {{ user.credenziali.ruolo }}
              </span>
            </div>
          </div>

          <!-- DATI PRINCIPALI -->
          <div class="col-md-6">
            <div class="info-box">
              <label>Email</label>
              <p>{{ user.credenziali.email }}</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="info-box">
              <label>Telefono</label>
              <p>
                {{ user.profile.telefono || 'Non specificato' }}
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="info-box">
              <label>Provincia</label>
              <p>
                {{ user.iscrizione.provincia || 'Non specificata' }}
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="info-box">
              <label>Squadra</label>
              <p>
                {{ user.iscrizione.squadra || 'Nessuna squadra' }}
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="info-box">
              <label>Stato</label>
              <p>
                {{ user.iscrizione.stato || 'Non disponibile' }}
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="info-box">
              <label>Punteggio</label>
              <p>
                {{ user.iscrizione.punteggio ?? 0 }}
              </p>
            </div>
          </div>

          <!-- BIO -->
          <div class="col-12">
            <div class="info-box">
              <label>Bio</label>
              <p>
                {{ user.profile.bio || 'Nessuna bio inserita' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-lg border-0 mt-4" style="border-radius: 12px">
      <div
        class="card-header text-white"
        style="background: linear-gradient(90deg, #0d6efd, #0b5ed7)"
      >
        <h5 class="mb-0 fs-4">Linee Guida</h5>
      </div>

      <div class="card-body p-4" style="background-color: #f8f9fa">
        <app-checkbox-indy
          [checks]="lineeGuida"
          [tipo]="'multiple'"
          (allChecked)="lineeGuidaAccettate.set($event)"
        ></app-checkbox-indy>
      </div>
    </div>
  `,
})
export class Step2Component {
  public lineeGuidaAccettate = signal<boolean>(false);

  public lineeGuida: ICheckBox[] = [
    {
      testo:
        'Seguire le pratiche di sicurezza per proteggere i dati sensibili.',
      id: 'sicurezza',
    },
    {
      testo: 'Garantire l’accessibilità e l’usabilità dei servizi digitali.',
      id: 'accessibilita',
    },
    {
      testo: 'Mantenere una comunicazione chiara e tempestiva con il team.',
      id: 'comunicazione',
    },
  ];

  @Input() user!: User;
  @Output() lineeGuidaEvent = new EventEmitter<boolean>();

  constructor() {
    effect(() => this.lineeGuidaEvent.emit(this.lineeGuidaAccettate()));
  }
}
