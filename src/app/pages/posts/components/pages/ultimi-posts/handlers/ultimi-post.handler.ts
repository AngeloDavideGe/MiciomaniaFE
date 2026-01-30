import { take } from 'rxjs';
import { DataHttp } from '../../../../../../core/api/http.data';
import { PostService } from '../../../../services/post.service';
import { TweetAll } from '../../../shared/post.interface';

export function getAllPubblicazioni(params: {
  postService: PostService;
  nextCall: Function;
}): void {
  const maxPosts: number = params.postService.maxPostsVisible;

  if (!params.postService.loadPostsBool) {
    params.postService.loadPostsBool = true;
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
          params.nextCall(data);
        },
        error: (err) => console.error('errore nel recupero dei post', err),
      });
  } else {
    params.nextCall();
  }
}

function getOldPosts(posts: TweetAll[], maxPostsVisible: number): TweetAll[] {
  return posts.concat(DataHttp.postVisti.oldPosts).slice(-maxPostsVisible);
}
