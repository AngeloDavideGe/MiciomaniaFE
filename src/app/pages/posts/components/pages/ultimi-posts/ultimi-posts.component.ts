import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { PostService } from '../../../services/post.service';
import { CardPostComponent } from './components/card-post.component';
import { NoPostComponent } from './components/no-post.component';
import { getAllPubblicazioni } from './handlers/ultimi-post.handler';
import { CercaProfiliComponent } from './components/cerca-profili/cerca-profili.component';
import { CustomNavBarComponent } from '../../../../../shared/components/custom/navbar-custom.component';

@Component({
  standalone: true,
  selector: 'app-ultimi-posts',
  imports: [
    CardPostComponent,
    NoPostComponent,
    CustomNavBarComponent,
    CercaProfiliComponent,
  ],
  templateUrl: './ultimi-posts.component.html',
  styleUrl: './ultimi-posts.component.scss',
})
export class UltimiPostsComponent implements OnInit {
  public postService = inject(PostService);
  private loadingService = inject(LoadingService);

  public searchQuery = signal<string>('');
  public searchActive = signal<boolean>(false);

  ngOnInit(): void {
    getAllPubblicazioni({
      postService: this.postService,
      loadingService: this.loadingService,
      nextCall: () => {},
    });
  }
}
