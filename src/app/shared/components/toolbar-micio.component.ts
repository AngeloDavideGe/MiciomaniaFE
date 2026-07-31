import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { AbbreviateNumberPipe } from '../../../library/pipes/number-format.pipe';
import { OpereToolbar } from '../interfaces/opere.interface';

@Component({
  selector: 'app-toolbar-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AbbreviateNumberPipe],
  template: `
    <div class="manga-top">
      <div class="stats">
        @for (stat of stats(); track stat.title) {
          <div class="stat-card">
            <i class="bi" [class]="stat.icon"></i>

            <div>
              <h4>{{ stat.value | abbreviateNumber }}</h4>
              <span>{{ stat.title }}</span>
            </div>
          </div>
        }
      </div>

      <div class="toolbar">
        <div class="search">
          <i class="bi bi-search"></i>
          <input
            type="text"
            [placeholder]="placeholder()"
            (input)="searchQuery.set($event.target.value)"
          />
        </div>
      </div>
    </div>
  `,
  styles: `
    .manga-top {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .stats {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .stat-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1rem 1.4rem;
      min-width: 180px;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: 0.25s;

      &:hover {
        border-color: var(--primary);
        box-shadow: var(--primary-shadow);
      }

      i {
        color: var(--primary);
        font-size: 1.6rem;
      }

      h4 {
        color: var(--text);
        margin: 0;
        font-size: 1.35rem;
        font-weight: 700;
      }

      span {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }

    .toolbar {
      display: flex;
      gap: 1rem;
    }

    .search {
      flex: 1;
      position: relative;

      i {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-secondary);
      }

      input {
        width: 100%;
        max-width: 25rem;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 0.9rem 1rem 0.9rem 48px;
        color: var(--text);
        outline: none;
        transition: 0.25s;

        &:focus {
          border-color: var(--primary);
        }
      }
    }

    .order select {
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 12px;
      padding: 0.9rem 1rem;
      min-width: 240px;
      outline: none;
    }

    .genres {
      display: flex;
      gap: 0.7rem;
      overflow-x: auto;
      padding-bottom: 0.2rem;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .genre {
      background: transparent;
      color: var(--text-secondary);
      border: none;
      border-bottom: 2px solid transparent;
      padding: 0.8rem 0.4rem;
      white-space: nowrap;
      transition: 0.25s;

      &:hover {
        color: var(--text);
      }

      &.active {
        color: var(--primary-light);
        border-color: var(--primary);
      }
    }

    @media (max-width: 900px) {
      .toolbar {
        flex-direction: column;
      }

      .order select {
        width: 100%;
      }
    }
  `,
})
export class ToolbarMicioComponent {
  public stats = input<OpereToolbar[]>();
  public searchQuery = model<string>('');
  public placeholder = input<string>('Cerca...');
}
