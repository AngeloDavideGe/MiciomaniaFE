import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { finalize, take } from 'rxjs';
import { MN } from '../../../../../../../shared/interfaces/github.interface';
import { GitHubService } from '../../../../../../../shared/services/api/github.service';
import { LoadingService } from '../../../../../../../shared/services/template/loading.service';
import { mn_imports } from './imports/m-n.import';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';

@Component({
  selector: 'app-m-n',
  imports: mn_imports,
  templateUrl: './m-n.component.html',
})
export class MNComponent implements OnInit {
  public gitHubService = inject(GitHubService);
  private loadService = inject(LoadingService);

  @Input() squadreLang!: SquadreLang;

  public classMN = signal<string>('row-cols-1 row-cols-md-2 row-cols-lg-3 g-4');

  ngOnInit(): void {
    if (this.gitHubService.mn.length == 0) {
      this.loadService.show();
      this.gitHubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '797ad9d22d6c2401fcaabfda1c6d870f',
          'MeN.json',
        )
        .pipe(
          take(1),
          finalize(() => this.loadService.hide()),
        )
        .subscribe({
          next: (gist) => (this.gitHubService.mn = gist as MN[]),
          error: (error) => console.error('Error fetching M&N data:', error),
        });
    }
  }
}
