import { Component, effect, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DataHttp } from '../../../../core/api/http.data';
import { Social } from '../../../../shared/interfaces/github.interface';
import { GitHubService } from '../../../../shared/services/api/github.service';
import { Lingua } from '../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-social-link',
  standalone: true,
  imports: [],
  template: `
    <section data-bs-version="5.1" class="social02 py-5" id="social02-2">
      <div class="container">
        <div class="text-center mb-5">
          <h6 class="fw-bold display-6">Seguiteci su</h6>
        </div>
        <div class="row g-4">
          @if (gitHubService.social.length > 0) {
            <!-- Lista social -->
            @for (s of gitHubService.social; track s.nome) {
              <div class="col-12 col-md-6 col-lg-4 d-flex align-items-center">
                <i
                  class="bi fs-1 me-3"
                  [class]="s.icona"
                  [style]="{ color: s.colore }"
                ></i>
                <div (click)="openLink(s.link)" style="cursor: pointer;">
                  <h4 class="fw-bold">{{ s.nome }}</h4>
                  <p class="mb-0">{{ s.descrizione[lingua] }}</p>
                </div>
              </div>
            }
          } @else {
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
  public lingua: Lingua = Lingua.it;

  constructor() {
    effect(() => (this.lingua = DataHttp.lingua()));
  }

  ngOnInit(): void {
    if (this.gitHubService.social.length == 0) {
      this.gitHubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '831668ef76a20e1c4cbf88666215fcfa',
          'Social.json',
        )
        .pipe(take(1))
        .subscribe({
          next: (data) => (this.gitHubService.social = data as Social[]),
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
