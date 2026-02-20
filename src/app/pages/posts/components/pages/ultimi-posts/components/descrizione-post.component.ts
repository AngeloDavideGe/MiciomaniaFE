import { Component, Input } from '@angular/core';
import { TweetAll } from '../../../shared/post.interface';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-descrizione-post',
  imports: [DatePipe],
  template: `
    <div class="tweet-container">
      <div class="tweet-header">
        <img class="tweet-avatar" [src]="imgUser" alt="profile" />

        <div class="tweet-user-info">
          <div class="tweet-user-row">
            <span class="tweet-username">{{
              post.userName + ' (' + post.idUtente + ')'
            }}</span>
            <span class="tweet-date">
              • {{ post.dataCreazione | date: 'short' }}
            </span>
          </div>

          <div class="tweet-text">
            {{ post.testo }}
          </div>
        </div>
      </div>

      <div class="tweet-actions">
        <i class="bi bi-heart"></i>
        <i class="bi bi-chat"></i>
        <i class="bi bi-share"></i>
      </div>
    </div>
  `,
  styles: [
    `
      .tweet-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background-color: var(--surface-color);
        transition: background 0.2s ease;

        &:hover {
          background-color: var(--bg-hover);
        }

        .tweet-header {
          display: flex;
          gap: 12px;

          .tweet-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid var(--border-light);
          }

          .tweet-user-info {
            display: flex;
            flex-direction: column;
            flex: 1;

            .tweet-user-row {
              display: flex;
              align-items: center;
              gap: 6px;

              .tweet-username {
                font-weight: 600;
                font-size: 1rem;
                color: var(--text-color);
              }

              .tweet-date {
                font-size: 0.8rem;
                color: var(--text-muted);
              }
            }

            .tweet-text {
              font-size: 0.95rem;
              line-height: 1.6;
              margin-top: 4px;
              color: var(--text-secondary);
              white-space: pre-wrap;
            }
          }
        }

        .tweet-actions {
          display: flex;
          justify-content: space-around;
          padding-top: 8px;
          font-size: 1.1rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-light);

          i {
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 8px;
            transition: all 0.15s ease;

            &:hover {
              background-color: var(--bg-active);
              color: var(--primary-color);
              transform: scale(1.15);
            }

            &:active {
              background-color: var(--bg-hover);
            }
          }
        }
      }
    `,
  ],
})
export class DescrizionePostComponent {
  @Input() post!: TweetAll;
  @Input() imgUser!: string;
}
