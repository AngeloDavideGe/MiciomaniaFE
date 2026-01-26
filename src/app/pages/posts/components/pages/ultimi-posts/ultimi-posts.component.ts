import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { PostService } from '../../../services/post.service';
import { getAllPubblicazioni } from './handlers/ultimi-post.handler';
import { ultimiPost_import } from './imports/ultimi-post.import';

@Component({
  standalone: true,
  selector: 'app-ultimi-posts',
  imports: ultimiPost_import,
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
