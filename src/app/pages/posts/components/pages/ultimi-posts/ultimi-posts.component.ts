import { Component, inject, OnInit, signal } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { filterType } from './components/filtri-post.component';
import { getAllPubblicazioni } from './handlers/ultimi-post.handler';
import { ultimiPost_import } from './imports/ultimi-post.import';
import { TweetAll } from '../../shared/post.interface';
import { GetFiltriCustom } from '../../../../../shared/utilities/functions/pagination.utilities';

@Component({
  standalone: true,
  selector: 'app-ultimi-posts',
  imports: ultimiPost_import,
  templateUrl: './ultimi-posts.component.html',
  styleUrl: './ultimi-posts.component.scss',
})
export class UltimiPostsComponent implements OnInit {
  public postService = inject(PostService);

  public selectedFilter = signal<filterType>(null);
  public searchQuery = signal<string>('');
  public searchQueryPost = signal<string>('');
  public searchActive = signal<'filter' | 'users' | ''>('');
  public postCaricati = signal<boolean>(false);

  public postFiltri = GetFiltriCustom<TweetAll, null>({
    elemTable: this.postService.allPosts,
    select: [
      {
        key: 'testo',
        query: this.searchQueryPost,
      },
    ],
  });

  ngOnInit(): void {
    getAllPubblicazioni({
      postService: this.postService,
      nextCall: () => this.postCaricati.set(true),
    });
  }

  public applicaFiltro(filtro: filterType): void {
    this.selectedFilter.set(filtro);
    switch (filtro) {
      case 'user':
        this.searchActive.set('users');
        break;
      case 'post':
        this.searchActive.set('');
        this.searchQueryPost.set(this.searchQuery());
        break;
      default:
        this.searchActive.set('');
    }
  }
}
