import { NgClass, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { GitHubService } from '../../../../shared/services/api/github.service';
import { Social } from '../../../../shared/interfaces/github.interface';
import { DataHttp } from '../../../../core/api/http.data';

@Component({
  selector: 'app-social-link',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `
    <section data-bs-version="5.1" class="social02 py-5" id="social02-2">
      <div class="container">
        <div class="text-center mb-5">
          <h6 class="fw-bold display-6">Seguiteci su</h6>
        </div>
        <div class="row g-4">
          @if(social.length > 0) { @for(s of social; track s.nome) {
          <div class="col-12 col-md-6 col-lg-4 d-flex align-items-center">
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
          } } @else {
          <div
            class="d-flex justify-content-center align-items-center spinner-template-stile"
          >
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          }
        </div>
      </div>
    </section>
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
  public gitHubService = inject(GitHubService);
  public social: Social[] = DataHttp.social;

  ngOnInit(): void {
    this.loadSocial();
  }

  private loadSocial(): void {
    if (DataHttp.social.length == 0) {
      this.gitHubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '831668ef76a20e1c4cbf88666215fcfa',
          'Social.json'
        )
        .pipe(take(1))
        .subscribe({
          next: (data) => (this.social = data as Social[]),
          error: (err) => console.error('errore recupero social', err),
        });
    }
  }

  openLink(link: string): void {
    if (link) {
      window.open(link);
    }
  }
}
