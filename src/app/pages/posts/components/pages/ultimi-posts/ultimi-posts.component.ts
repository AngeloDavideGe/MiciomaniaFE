import { Component, inject, OnInit, signal } from '@angular/core';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../../library/functions/pagination.function';
import { ICheckBox } from '../../../../../../library/interfaces/form.interface';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
import { DataHttp } from '../../../../../core/api/http.data';
import { PostService } from '../../../services/post.service';
import { TweetAll } from '../../shared/post.interface';
import { ultimiPost_import } from './ultimi-posts.import';
import { ToggleStyles } from '../../../../../../library/interfaces/toggle.interface';

@Component({
  standalone: true,
  selector: 'app-ultimi-posts',
  imports: ultimiPost_import,
  templateUrl: './ultimi-posts.component.html',
  styleUrl: './ultimi-posts.component.scss',
})
export class UltimiPostsComponent implements OnInit {
  public postService = inject(PostService);
  private appConfig = inject(AppConfigService);

  public selectedFilter = signal<string | undefined>(undefined);
  public searchQuery = signal<string>('');
  public searchQueryPost = signal<string>('');
  public searchActive = signal<'filter' | 'users' | ''>('');
  public postCaricati = signal<boolean>(false);

  public readonly toggleStyle: ToggleStyles = {
    left: '50%',
    transform: 'translateX(-50%)',
  };

  public postFiltri = GetFiltriCustom<TweetAll, null>({
    elemTable: this.postService.allPosts,
    select: [
      {
        key: 'testo',
        query: this.searchQueryPost,
      },
    ],
  });

  public checks: ICheckBox[] = [
    {
      testo: 'User',
      id: 'user',
      icon: 'person',
    },
    {
      testo: 'Post',
      id: 'post',
      icon: 'file-text',
    },
  ];

  ngOnInit(): void {
    handlerFunc<TweetAll[]>({
      skipCall: this.postService.loadedPostsBool,
      callHttp: () => this.postService.getUltimiPosts(),
      nextCall: (data: TweetAll[]) => {
        DataHttp.postVisti = {
          oldPosts: this.getOldPosts(
            data,
            this.appConfig.config.maxElement.postVisible,
          ),
          lastUpdated: new Date(),
        };
        this.postService.allPosts.update((posts: TweetAll[]) =>
          posts.concat(data),
        );
        this.postService.newPosts = data;
        this.postCaricati.set(true);
      },
      elseCall: () => this.postCaricati.set(true),
    });

    this.postService.loadedPostsBool = true;
  }

  public applicaFiltro(): void {
    switch (this.selectedFilter()) {
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

  private getOldPosts(posts: TweetAll[], maxPostsVisible: number): TweetAll[] {
    return posts.concat(DataHttp.postVisti.oldPosts).slice(-maxPostsVisible);
  }
}
