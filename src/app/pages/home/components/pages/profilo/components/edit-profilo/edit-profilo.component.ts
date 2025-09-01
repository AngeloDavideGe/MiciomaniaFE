import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../../../shared/interfaces/users.interface';
import { TabInfoComponent } from './tab-info/tab-info.component';
import { TabSocialComponent } from './tab-social/tab-social.component';
import { ProfiloLang } from '../../languages/interfaces/profilo-lang.interface';

@Component({
  selector: 'app-edit-profilo',
  standalone: true,
  imports: [TabInfoComponent, TabSocialComponent],
  template: ` <!-- Tab Header -->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div
            class="modal-header d-flex align-items-center justify-content-between border-bottom-0 pb-0"
          >
            <h5 class="modal-title mb-0">
              {{ profiloLang.modificaProfilo || 'Modifica profilo' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              (click)="chiudi.emit()"
              aria-label="Close"
            ></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body pt-0 mt-2">
            <nav class="mb-4">
              <div
                class="nav nav-tabs border-bottom-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  class="nav-link me-2 px-3 py-2"
                  [class.active]="tab === 'info'"
                  (click)="tab = 'info'"
                  style="border-width: 0 0 2px 0; border-style: solid; border-color: transparent;"
                  [style.border-color]="
                    tab === 'info' ? '#0d6efd' : 'transparent'
                  "
                >
                  Info
                </button>
                <button
                  class="nav-link px-3 py-2"
                  [class.active]="tab === 'social'"
                  (click)="tab = 'social'"
                  style="border-width: 0 0 2px 0; border-style: solid; border-color: transparent;"
                  [style.border-color]="
                    tab === 'social' ? '#0d6efd' : 'transparent'
                  "
                >
                  Social
                </button>
              </div>
            </nav>

            <!-- Tab Content -->
            <div class="tab-content">
              @switch(tab) {
              <!-- Info -->
              @case('info') {
              <tab-info-profilo
                [profiloLang]="profiloLang"
                [user]="user"
                (chiudi)="chiudi.emit()"
              ></tab-info-profilo>
              }
              <!-- Social -->
              @case('social') {
              <tab-social-profilo
                [profiloLang]="profiloLang"
                [user]="user"
                (chiudi)="chiudi.emit()"
              ></tab-social-profilo>
              } }
            </div>
          </div>
        </div>
      </div>
    </div>`,
})
export class EditProfiloComponent {
  public tab: 'info' | 'social' = 'info';

  @Input() profiloLang!: ProfiloLang;
  @Input() user: User = {} as User;
  @Output() chiudi = new EventEmitter<void>();
}
