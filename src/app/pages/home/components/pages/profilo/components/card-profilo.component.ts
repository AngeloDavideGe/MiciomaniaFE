import { DatePipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { EditableSocial } from '../../../../interfaces/profilo.interface';
import { ProfiloService } from '../../../../services/profilo.service';
import { modaleApertaType } from '../types/profilo.type';
import { Profilo } from '../../../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-card-profilo',
  standalone: true,
  imports: [NgTemplateOutlet, DatePipe, TitleCasePipe],
  template: `
    <div class="card shadow-sm border-0">
      <!-- Immagine di copertina -->
      <div
        class="position-relative bg-light d-flex align-items-center"
        style="
            height: 150px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            padding-left: 20px;
            padding-top: 7rem;
          "
      >
        @if (!profiloService.aggiornamentoPic) {
        <img
          [src]="
            profilo.user.credenziali.profilePic ||
            'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg'
          "
          alt="Profile Picture"
          class="rounded-circle border border-white me-3"
          style="width: 10rem; height: 10rem"
        />
        } @else {
        <ng-container *ngTemplateOutlet="spinnerTemplate"></ng-container>

        } @if (profiloPersonale) {
        <button
          class="btn btn-light btn-sm d-flex align-items-center justify-content-center shadow"
          style="
              border-radius: 50%;
              width: 36px;
              height: 36px;
              border: 1px solid #ced4da;
              z-index: 2;
              margin-top: 90px;
            "
          (click)="modaleAperta.emit('change-pic')"
          title="Modifica foto profilo"
        >
          <i class="bi bi-pencil-fill text-primary"></i>
        </button>
        }
      </div>

      <!-- Informazioni del profilo -->
      <div class="card-body" style="margin-top: 60px; padding: 20px">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2
              class="mb-0"
              style="font-size: 24px; font-weight: bold; color: #0f1419"
            >
              {{ profilo.user.credenziali.nome }}
            </h2>
            <p class="text-muted mb-1" style="font-size: 14px">
              {{ profilo.user.id }}
            </p>
          </div>
          <!-- Pulsante Modifica Profilo -->
          @if (profiloPersonale) {
          <button
            class="btn btn-outline-secondary btn-sm"
            (click)="modaleAperta.emit('edit-profilo')"
            style="font-size: 14px; font-weight: bold; border-radius: 8px"
          >
            ✏️
          </button>
          }
        </div>

        <p class="mt-3" style="font-size: 16px; color: #0f1419">
          {{ profilo.user.profile.bio || 'Nessuna bio disponibile' }}
        </p>
        <div class="d-flex text-muted mb-3" style="font-size: 14px">
          @if (profilo.user.iscrizione.citta &&
          profilo.user.iscrizione.provincia) {
          <span class="me-3">
            <i class="fas fa-map-marker-alt"></i>
            {{ profilo.user.iscrizione.citta }},
            {{ profilo.user.iscrizione.provincia }}
          </span>
          } @if (profilo.user.profile.compleanno) {
          <span class="me-3">
            <i class="fas fa-birthday-cake"></i> Nato il
            {{ profilo.user.profile.compleanno | date : 'dd/MM/yyyy' }}
          </span>
          }
        </div>

        @if (socialArray.length > 0) {
        <div class="d-flex flex-wrap">
          @for (social of socialArray; track $index) {
          <a
            (click)="openLink(social.link)"
            target="_blank"
            class="btn btn-outline-primary btn-sm me-2 mb-2"
            style="font-size: 14px; border-radius: 20px; padding: 4px 12px"
          >
            {{ social.key | titlecase }}
          </a>
          }
        </div>
        }
      </div>
    </div>
  `,
})
export class CardProfiloComponent {
  public profiloService = inject(ProfiloService);
  @Input() socialArray!: EditableSocial[];
  @Input() profilo!: Profilo;
  @Input() spinnerTemplate!: TemplateRef<any>;
  @Input() profiloPersonale!: boolean;
  @Output() modaleAperta = new EventEmitter<modaleApertaType>();

  openLink(link: string): void {
    try {
      const url = new URL(link);

      if (url.protocol === 'http:' || url.protocol === 'https:') {
        window.open(link, '_blank');
      } else {
        this.openInvalidLinkPage();
      }
    } catch (e) {
      this.openInvalidLinkPage();
    }
  }

  private openInvalidLinkPage(): void {
    const newWindow: Window | null = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(this.getErrorPage());
      newWindow.document.close();
    }
  }

  private getErrorPage(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Link non valido</title>
        <style>
          body {
            font-family: 'Roboto', Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }
          h1 {
            color: #e63946;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
          }
          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #0056b3;
          }
          .icon {
            font-size: 50px;
            color: #e63946;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">⚠️</div>
          <h1>Link non valido</h1>
          <p>Il collegamento a cui stai cercando di accedere non è disponibile o non esiste.</p>
          <button onclick="window.close()">Chiudi questa finestra</button>
        </div>
      </body>
      </html>
    `;
  }
}
