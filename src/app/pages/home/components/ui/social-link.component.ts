import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { HomeService } from '../../../services/home.service';
import { Social } from '../../../interfaces/profilo.interface';

@Component({
  selector: 'app-social-link',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle],
  template: `
    <section data-bs-version="5.1" class="social02 py-5" id="social02-2">
      <div class="container">
        <div class="text-center mb-5">
          <h6 class="fw-bold display-6">Seguiteci su</h6>
        </div>
        <div class="row g-4">
          <ng-container
            *ngIf="homeService.social.length > 0; else spinnerTemplate"
          >
            <div
              *ngFor="let s of homeService.social"
              class="col-12 col-md-6 col-lg-4 d-flex align-items-center"
            >
              <i
                class="bi fs-1 me-3"
                [ngClass]="s.icona"
                [ngStyle]="{ color: s.colore }"
              ></i>
              <div (click)="openLink(s.link)" style="cursor: pointer;">
                <h4 class="fw-bold">{{ s.nome }}</h4>
                <p class="mb-0">{{ s.descrizione }}</p>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </section>

    <ng-template #spinnerTemplate>
      <div
        class="d-flex justify-content-center align-items-center spinner-template-stile"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .spinner-template-stile {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
      }
    `,
  ],
})
export class SocialLinkComponent implements OnInit {
  public homeService = inject(HomeService);

  ngOnInit(): void {
    this.loadSocial();
  }

  private loadSocial(): void {
    if (this.homeService.social.length == 0) {
      this.homeService
        .getGistFormGithub(
          'AngeloDavideGe',
          '831668ef76a20e1c4cbf88666215fcfa',
          'Social.json'
        )
        .pipe(take(1))
        .subscribe({
          next: (data) => this.saveSocial(data),
          error: (err) => console.error('errore recupero social', err),
        });
    }
  }

  private saveSocial(data: Social[]): void {
    this.homeService.social = data;
    sessionStorage.setItem(
      'socialLinks',
      JSON.stringify(this.homeService.social)
    );
  }

  openLink(link: string): void {
    if (link) {
      window.open(link);
    }
  }
}
