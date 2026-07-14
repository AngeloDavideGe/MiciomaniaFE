import { Component, inject, OnInit } from '@angular/core';
import { SpinnerIndyComponent } from '../../../../../../library/components/spinner/spinner-indy.component';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { Social } from '../../../../../shared/interfaces/github.interface';
import { MNService } from '../../../../../shared/services/mn.service';
@Component({
  selector: 'app-social-link',
  standalone: true,
  imports: [SpinnerIndyComponent],
  templateUrl: './social-link.component.html',
  styleUrl: './social-link.component.scss',
})
export class SocialLinkComponent implements OnInit {
  public mnService = inject(MNService);

  ngOnInit(): void {
    handlerFunc<Social[]>({
      skipCall: this.mnService.socialLoaded,
      callHttp: () => this.mnService.getSocialLinks(),
      nextCall: (data: Social[]) => this.mnService.social.set(data),
      errorCall: () => (this.mnService.socialLoaded = false),
    });

    this.mnService.socialLoaded = true;
  }

  openLink(link: string): void {
    if (link) {
      window.open(link);
    }
  }
}
