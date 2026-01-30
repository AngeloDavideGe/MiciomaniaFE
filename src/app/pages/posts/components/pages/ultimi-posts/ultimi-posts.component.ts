import { Component, inject, OnInit, signal } from '@angular/core';
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

  public searchQuery = signal<string>('');
  public searchActive = signal<boolean>(false);
  public postCaricati = signal<boolean>(false);

  ngOnInit(): void {
    getAllPubblicazioni({
      postService: this.postService,
      nextCall: () => this.postCaricati.set(true),
    });
  }
}
