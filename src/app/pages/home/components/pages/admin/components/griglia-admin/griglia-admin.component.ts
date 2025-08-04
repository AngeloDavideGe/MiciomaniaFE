import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import {
  User,
  UserParams,
} from '../../../../../../../shared/interfaces/users.interface';
import { Ruolo } from '../../../../../../../shared/enums/users.enum';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize.pipe';
import { TableUserParamsComponent } from './table-user-params/table-user-params.component';

@Component({
  selector: 'app-griglia-admin',
  standalone: true,
  imports: [CapitalizeFirstLetterPipe, TableUserParamsComponent],
  template: `
    <div
      class="row justify-content-center"
      style="gap: 1.5rem; row-gap: 2rem; margin: 0 auto"
    >
      @for(ruolo of ruoli; track $index){
      <div
        class="flex-grow-0 flex-shrink-0"
        style="min-width: 20rem; max-width: 30rem"
      >
        <div class="card border-0 shadow-lg h-100">
          <div
            class="card-header bg-primary text-white rounded-top d-flex align-items-center py-2"
          >
            <i class="bi bi-people-fill me-2 fs-5"></i>
            <h5 class="card-title mb-0 flex-grow-1 fs-6">
              {{ ruolo | capitalizeFirstLetter }}
            </h5>
          </div>
          <div class="card-body p-0 d-flex flex-column">
            <app-table-user-params
              [ruolo]="ruolo"
              [user]="user"
              [userMap]="userMapByRuolo[ruolo]"
              (modificaRuolo)="modificaRuolo.emit($event)"
              (eliminaRuolo)="eliminaRuolo.emit($event)"
              class="p-3 flex-grow-1"
            ></app-table-user-params>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class GrigliaAdminComponent {
  public ruoli = Object.values(Ruolo);
  @Input() user!: User | null;
  @Input() userMapByRuolo!: { [ruolo: string]: Signal<UserParams[]> };
  @Output() modificaRuolo = new EventEmitter<UserParams>();
  @Output() eliminaRuolo = new EventEmitter<UserParams>();
}
