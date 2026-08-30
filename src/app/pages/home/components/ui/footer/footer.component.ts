import { Component, computed, inject, OnInit } from '@angular/core';
import { SpinnerIndyComponent } from '../../../../../../library/components/spinner/spinner-indy.component';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { ContaierMicioComponent } from '../../../../../shared/components/container-micio.component';
import { IFooter } from '../../../../../shared/interfaces/mn.interface';
import { MNService } from '../../../../../shared/services/mn.service';
import { AppConfigService } from '../../../../../core/api/appConfig.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContaierMicioComponent, SpinnerIndyComponent],
  template: `<footer class="footer-section">
    <app-container-micio [background]="'transparent'">
      @if (!footer()) {
        <div class="spinner-wrapper">
          <app-spinner-indy></app-spinner-indy>
        </div>
      } @else {
        <div class="footer-grid p-4 p-md-5">
          <div class="footer-brand">
            <h2>{{ footer()?.brand_name }}</h2>
            <p>
              {{ footer()?.brand_description }}
            </p>
          </div>

          <div>
            <h5>{{ lang.LinkUtili }}</h5>
            <ul>
              @for (link of footer()?.quick_links || []; track link.url) {
                <li>
                  <a>{{ link.label }}</a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h5>{{ lang.Info }}</h5>
            <ul>
              @for (link of footer()?.info_links || []; track link.url) {
                <li>
                  <a>{{ link.label }}</a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h5>{{ lang.Supporto }}</h5>
            <ul>
              @for (link of footer()?.support_links || []; track link.url) {
                <li>
                  <a>{{ link.label }}</a>
                </li>
              }
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          {{ footer()?.copyright_text }}
        </div>

        <br />
      }
    </app-container-micio>
  </footer>`,
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  private mnService = inject(MNService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Home.Footer;
  public footer = computed<IFooter | null>(() => this.mnService.footer());

  ngOnInit() {
    handlerFunc<IFooter>({
      skipCall: this.mnService.footerLoaded,
      callHttp: () => this.mnService.getFooter(),
      nextCall: (data: IFooter) => this.mnService.footer.set(data),
      errorCall: () => (this.mnService.footerLoaded = false),
    });

    this.mnService.footerLoaded = true;
  }
}
