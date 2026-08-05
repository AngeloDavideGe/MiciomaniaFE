import { Component } from '@angular/core';
import { ContaierMicioComponent } from '../../../../../shared/components/container-micio.component';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContaierMicioComponent],
  template: `<footer class="footer-section">
    <app-container-micio [background]="'transparent'">
      <div class="footer-grid p-4 p-md-5">
        <div class="footer-brand">
          <h2>Miciomania</h2>
          <p>
            Il tuo mondo di intrattenimento: manga, musica, giochi e tanto
            altro.
          </p>
        </div>

        <div>
          <h5>Link Utili</h5>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Manga</a></li>
            <li><a href="#">Musica</a></li>
            <li><a href="#">Giochi</a></li>
            <li><a href="#">Classifiche</a></li>
          </ul>
        </div>

        <div>
          <h5>Info</h5>
          <ul>
            <li><a href="#">Chi siamo</a></li>
            <li><a href="#">Regolamento</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Termini di utilizzo</a></li>
            <li><a href="#">Contattaci</a></li>
          </ul>
        </div>

        <div>
          <h5>Supporto</h5>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Aiuto</a></li>
            <li><a href="#">Segnala un problema</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        © 2026 Miciomania. Tutti i diritti riservati.
      </div>
    </app-container-micio>
  </footer> `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
