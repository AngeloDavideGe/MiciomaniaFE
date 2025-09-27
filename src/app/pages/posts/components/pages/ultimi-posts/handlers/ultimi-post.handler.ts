import { take } from 'rxjs';
import { DataHttp } from '../../../../../../core/api/http.data';
import { LoadingService } from '../../../../../../shared/services/template/loading.service';
import { PostService } from '../../../../services/post.service';
import { TweetAll } from '../../../shared/post.interface';

export function getAllPubblicazioni(params: {
  postService: PostService;
  loadingService: LoadingService;
  nextCall: Function;
}): void {
  const maxPosts: number = params.postService.maxPostsVisible;

  if (!params.postService.loadPostsBool) {
    params.postService.loadPostsBool = true;
    params.loadingService.show();
    params.postService
      .getUltimiPosts()
      .pipe(take(1))
      .subscribe({
        next: (data: TweetAll[]) => {
          DataHttp.postVisti = {
            oldPosts: getOldPosts(data, maxPosts),
            lastUpdated: new Date(),
          };
          params.postService.newPosts = data;
          params.loadingService.hide();
          params.nextCall(data);
        },
        error: (err) => console.error('errore nel recupero dei post', err),
      });
  }
}

function getOldPosts(posts: TweetAll[], maxPostsVisible: number): TweetAll[] {
  return posts.concat(DataHttp.postVisti.oldPosts).slice(-maxPostsVisible);
}
