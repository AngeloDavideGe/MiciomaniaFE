import { Component } from '@angular/core';

@Component({
  selector: 'app-error-iscrizione',
  standalone: true,
  imports: [],
  template: `
    <div
      class="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        class="text-center p-4 border rounded shadow bg-white"
        style="max-width: 400px;"
      >
        <h1 class="text-danger" style="font-size: 3rem;">Errore</h1>
        <p class="text-muted" style="font-size: 1.2rem;">
          Non sei iscritto. Registrati per accedere.
        </p>
        <a
          href="/auth/sign-in"
          class="btn btn-primary w-100"
          style="font-size: 1rem; padding: 10px 20px;"
          >Vai alla Registrazione</a
        >
        <a
          href="/auth/login"
          class="btn btn-outline-secondary w-100 mt-2"
          style="font-size: 1rem; padding: 10px 20px;"
          >Torna al Login</a
        >
      </div>
    </div>
  `,
})
export class ErrorIscrizioneComponent {}
