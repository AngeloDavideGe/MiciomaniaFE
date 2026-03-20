import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';
import {
  CheckBoxCustomComponent,
  ICheckBox,
} from '../../../../../../shared/components/custom/checkbox-custom.component';

@Component({
  standalone: true,
  selector: 'app-filtri-post',
  imports: [ButtonCustomComponent, CheckBoxCustomComponent],
  template: `
    <div class="filtri-container">
      <div class="filters-panel">
        <div class="filter-options">
          <app-checkbox-custom
            [checks]="checks"
            [initialChecked]="selectedFilter"
            (checkChange)="selectFilter($event)"
          ></app-checkbox-custom>
        </div>

        <div class="filter-actions">
          <app-button-custom
            [text]="'Azzera'"
            [disabled]="selectedFilter === null"
            [color]="'secondary-custom'"
            (clickBotton)="applyFilters(null)"
          ></app-button-custom>
          <app-button-custom
            [text]="'Applica'"
            [color]="'primary-custom'"
            (clickBotton)="applyFilters(selectedFilter)"
          ></app-button-custom>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .filtri-container {
        position: relative;

        .filters-panel {
          top: calc(100% + 8px);
          right: 0;
          width: 250px;
          background-color: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 16px;
          z-index: 1000;

          .filter-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;

            .filter-option {
              display: flex;
              align-items: center;
              padding: 8px 12px;
              margin: 0;
              border-radius: 8px;
              cursor: pointer;
              transition: background-color 0.2s;

              &:hover {
                background-color: var(--bg-light);
              }

              .form-check-input {
                margin-right: 12px;
                cursor: pointer;

                &:checked {
                  background-color: var(--primary-color);
                  border-color: var(--primary-color);
                }
              }

              .form-check-label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: var(--text-color);
                cursor: pointer;
                width: 100%;

                i {
                  color: var(--text-secondary);
                  font-size: 16px;
                }
              }
            }
          }

          .filter-actions {
            display: flex;
            justify-content: flex-end;
            border-top: 1px solid var(--border-color);
            padding-top: 16px;
          }
        }
      }
    `,
  ],
})
export class FiltriPostComponent {
  @Input() selectedFilter!: filterType;
  @Output() filterApplied = new EventEmitter<filterType>();

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

  selectFilter(filter: string): void {
    if (this.selectedFilter === filter) {
      this.selectedFilter = null;
    } else {
      this.selectedFilter = filter as filterType;
    }
  }

  applyFilters(filter: filterType): void {
    this.selectedFilter = filter;
    this.filterApplied.emit(filter);
  }
}

export type filterType = 'user' | 'post' | null;
