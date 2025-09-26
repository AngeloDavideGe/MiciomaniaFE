import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TweetAll } from '../../../shared/post.interface';

@Component({
  standalone: true,
  selector: 'app-card-post',
  imports: [DatePipe],
  template: `
    <div class="post-card card mb-4">
      <!-- Header -->
      <div class="card-header post-header d-flex align-items-center">
        <img
          [src]="post.utenteAvatar"
          alt="{{ post.utenteNome }}"
          class="avatar"
        />
        <span class="username ms-2">{{ post.utenteNome }}</span>
        <span class="ms-auto text-muted small">{{
          post.dataCreazione | date : 'short'
        }}</span>
      </div>

      <!-- Immagine post -->
      @if (post.immaginePost) {
      <img [src]="post.immaginePost" class="post-img" alt="Post image" />
      }

      <!-- Corpo -->
      <div class="card-body">
        <p class="card-text">
          <span class="fw-bold">{{ post.utenteNome }}</span> {{ post.testo }}
        </p>
      </div>

      <!-- Footer (azioni tipo Instagram) -->
      <div class="card-footer d-flex justify-content-between post-actions">
        <i class="bi bi-heart fs-5"></i>
        <i class="bi bi-chat fs-5"></i>
        <i class="bi bi-share fs-5"></i>
      </div>
    </div>
  `,
  styles: [
    `
      .post-card {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        .post-header {
          background: #fff;
          border-bottom: none;
          padding: 0.75rem 1rem;

          .avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #eee;
          }

          .username {
            font-weight: 600;
          }
        }

        .post-img {
          width: 100%;
          height: auto;
          max-height: 450px;
          object-fit: cover;
        }

        .card-body {
          background: #fff;
          padding: 0.75rem 1rem;

          .card-text {
            margin: 0;
            font-size: 0.95rem;
          }
        }

        .post-actions {
          background: #fff;
          border-top: none;
          padding: 0.5rem 1rem;

          i {
            cursor: pointer;
            transition: transform 0.2s;

            &:hover {
              transform: scale(1.2);
              color: #e03131;
            }
          }
        }
      }
    `,
  ],
})
export class CardPostComponent {
  @Input() post!: TweetAll;
}
