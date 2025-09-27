import { DatePipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { EditableSocial } from '../interfaces/profilo.interface';
import { PostService } from '../../../../services/post.service';
import { modaleApertaType } from '../interfaces/profilo.interface';
import { Profilo } from '../../../../../../shared/interfaces/http.interface';
import { ProfiloLang } from '../languages/interfaces/profilo-lang.interface';
import { errorPageProfilo } from '../error/error.profilo';

@Component({
  selector: 'app-card-profilo',
  standalone: true,
  imports: [NgTemplateOutlet, DatePipe, TitleCasePipe],
  template: `
    <div class="card shadow-sm border-0 mt-3">
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
        @if (!postService.aggiornamentoPic()) {
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
            title="Modifica dati profilo"
          >
            ✏️
          </button>
          }
        </div>

        <p class="mt-3" style="font-size: 16px; color: #0f1419">
          {{ profilo.user.profile.bio || profiloLang.noBio }}
        </p>
        <div class="d-flex text-muted mb-3" style="font-size: 14px">
          @if (profilo.user.iscrizione.citta &&
          profilo.user.iscrizione.provincia) {
          <span class="me-3">
            {{ profilo.user.iscrizione.citta }},
            {{ profilo.user.iscrizione.provincia }}
          </span>
          } @if (profilo.user.profile.compleanno) {
          <span class="me-3">
            {{ profiloLang.natoIl }}
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
  public postService = inject(PostService);
  @Input() profiloLang!: ProfiloLang;
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
    if (newWindow && newWindow.document) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(errorPageProfilo, 'text/html');

      newWindow.document.replaceChild(
        newWindow.document.importNode(doc.documentElement, true),
        newWindow.document.documentElement
      );
    }
  }
}
