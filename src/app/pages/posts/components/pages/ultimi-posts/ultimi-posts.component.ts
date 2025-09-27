import { Component, inject, OnInit } from '@angular/core';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { PostService } from '../../../services/post.service';
import { CardPostComponent } from './components/card-post.component';
import { NoPostComponent } from './components/no-post.component';
import { getAllPubblicazioni } from './handlers/ultimi-post.handler';

@Component({
  standalone: true,
  selector: 'app-ultimi-posts',
  imports: [CardPostComponent, NoPostComponent],
  templateUrl: './ultimi-posts.component.html',
})
export class UltimiPostsComponent implements OnInit {
  public postService = inject(PostService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    getAllPubblicazioni({
      postService: this.postService,
      loadingService: this.loadingService,
      nextCall: () => {},
    });
  }
}
