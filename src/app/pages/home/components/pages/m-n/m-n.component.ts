import { Component, inject, OnInit } from '@angular/core';
import { GitHubService } from '../../../../../shared/services/api/github.service';
import { finalize, take } from 'rxjs';
import { MN } from '../../../../../shared/interfaces/github.interface';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { HeaderMNComponent } from './components/header-mn.component';
import { CardLetteraComponent } from './components/card-lettera.component';
import { NgClass } from '@angular/common';
import { IconeListaComponent } from './components/icone-lista.component';

@Component({
  selector: 'app-m-n',
  imports: [
    HeaderMNComponent,
    CardLetteraComponent,
    NgClass,
    IconeListaComponent,
  ],
  templateUrl: './m-n.component.html',
  styles: ``,
})
export class MNComponent implements OnInit {
  public gitHubService = inject(GitHubService);
  private loadService = inject(LoadingService);

  public classMN: string = 'row-cols-1 row-cols-md-2 row-cols-lg-3 g-4';
  // public classListaMN: string = 'd-flex flex-column gap-3 mb-5';

  ngOnInit(): void {
    this.loadMN();
  }

  private loadMN(): void {
    if (this.gitHubService.mn.length == 0) {
      this.loadService.show();
      this.gitHubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '797ad9d22d6c2401fcaabfda1c6d870f',
          'MeN.json'
        )
        .pipe(
          take(1),
          finalize(() => this.loadService.hide())
        )
        .subscribe({
          next: (gist) => (this.gitHubService.mn = gist as MN[]),
          error: (error) => console.error('Error fetching M&N data:', error),
        });
    }
  }
}
