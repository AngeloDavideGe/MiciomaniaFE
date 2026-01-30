import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { MN } from '../../../../../../../shared/interfaces/github.interface';
import { GitHubService } from '../../../../../../../shared/services/api/github.service';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';
import { mn_imports } from './imports/m-n.import';

@Component({
  selector: 'app-m-n',
  imports: mn_imports,
  templateUrl: './m-n.component.html',
})
export class MNComponent implements OnInit {
  public gitHubService = inject(GitHubService);

  public classMN = signal<string>('row-cols-1 row-cols-md-2 row-cols-lg-3 g-4');
  public mnCaricati = signal<boolean>(this.gitHubService.mn.length > 0);

  @Input() squadreLang!: SquadreLang;

  ngOnInit(): void {
    if (!this.mnCaricati()) {
      this.gitHubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '797ad9d22d6c2401fcaabfda1c6d870f',
          'MeN.json',
        )
        .pipe(take(1))
        .subscribe({
          next: (gist) => {
            this.gitHubService.mn = gist as MN[];
            this.mnCaricati.set(true);
          },
          error: (error) => console.error('Error fetching M&N data:', error),
        });
    }
  }
}
