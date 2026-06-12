import { Component, effect, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../../../../library/components/spinner/spinner.component';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { DataHttp } from '../../../../core/api/http.data';
import {
  GitHubType,
  Social,
} from '../../../../shared/interfaces/github.interface';
import { Lingua } from '../../../../shared/interfaces/http.interface';
import { GitHubService } from '../../../../shared/services/api/github.service';
@Component({
  selector: 'app-social-link',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <section data-bs-version="5.1" class="social02 py-5" id="social02-2">
      <div class="container">
        <div class="text-center mb-3">
          <h6 class="fw-bold display-6" style="color: var(--text-color);">
            Seguiteci su
          </h6>
        </div>
        <div class="row g-4">
          @if (githubService.social().length > 0) {
            <div class="grid-card-layout">
              @for (s of githubService.social(); track s.nome) {
                <div class="elemento-centrato">
                  <i
                    class="bi fs-1 me-3"
                    [class]="s.icona"
                    [style]="{ color: s.colore }"
                  ></i>
                  <div
                    (click)="openLink(s.link)"
                    style="cursor: pointer; color: var(--text-color);"
                    onmouseover="this.style.color='var(--text-secondary)'"
                    onmouseout="this.style.color='var(--text-color)'"
                  >
                    <h4 class="fw-bold">{{ s.nome }}</h4>
                    <p class="mb-0" style="color: var(--text-muted);">
                      {{ s.descrizione[lingua] }}
                    </p>
                  </div>
                </div>
              }
            </div>
          } @else {
            <app-spinner></app-spinner>
          }
        </div>
      </div>
    </section>
  `,
})
export class SocialLinkComponent implements OnInit {
  public githubService = inject(GitHubService);
  public lingua: Lingua = Lingua.it;

  constructor() {
    effect(() => (this.lingua = DataHttp.lingua()));
  }

  ngOnInit(): void {
    handlerFunc<GitHubType>({
      skipCall: this.githubService.socialLoaded,
      callHttp: () =>
        this.githubService.getGistFormGithub(
          'AngeloDavideGe',
          '831668ef76a20e1c4cbf88666215fcfa',
          'Social.json',
        ),
      nextCall: (data) => this.githubService.social.set(data as Social[]),
      errorCall: () => (this.githubService.socialLoaded = false),
    });

    this.githubService.socialLoaded = true;
  }

  openLink(link: string): void {
    if (link) {
      window.open(link);
    }
  }
}
