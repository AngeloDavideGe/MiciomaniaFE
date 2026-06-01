import { TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { EditableSocial } from '../interfaces/profilo.interface';
import { DataHttp } from '../../../../../../core/api/http.data';
import { ProfiloLang } from '../languages/interfaces/profilo-lang.interface';
import { updateUserCustom } from '../../../../../../shared/handlers/auth.handler';
import { AuthService } from '../../../../../../shared/services/api/auth.service';

@Component({
  selector: 'tab-social-profilo',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  template: `
    <div class="social-form-container">
      @for (social of socialArray; track $index) {
        <div class="social-row row g-2 align-items-center mb-3">
          <div class="col-3">
            <select
              class="form-select form-select-sm"
              [(ngModel)]="social.key"
              style="min-width: 100px"
            >
              @for (soc of availableSocials; track $index) {
                <option [value]="soc">
                  {{ soc | titlecase }}
                </option>
              }
            </select>
          </div>

          <div class="col-8">
            <input
              type="text"
              class="form-control form-control-sm"
              [(ngModel)]="social.link"
              [placeholder]="'link di' + ' ' + social.key"
            />
          </div>

          <div class="col-1 text-end">
            <button
              class="btn btn-sm btn-outline-danger"
              (click)="removeSocial($index)"
              style="width: 30px"
              title="Rimuovi"
            >
              &minus;
            </button>
          </div>
        </div>
      }

      <div class="justify-content-between">
        <button
          class="btn btn-sm btn-outline-primary"
          (click)="addNewSocial()"
          style="width: 40px"
          title="Aggiungi social"
        >
          &plus;
        </button>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" (click)="saveChanges()">
            {{ profiloLang.salva || 'Salva' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            (click)="chiudi.emit()"
          >
            {{ profiloLang.chiudi || 'Chiudi' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class TabSocialComponent implements OnInit {
  private authService = inject(AuthService);

  public socialArray: EditableSocial[] = [];
  public socialArrayCopy: EditableSocial[] = [];
  public availableSocials = [
    'instagram',
    'youtube',
    'twitter',
    'tiktok',
    'threads',
    'twitch',
    'facebook',
  ];

  @Input() profiloLang!: ProfiloLang;
  @Input() user: User = {} as User;
  @Output() chiudi = new EventEmitter<void>();

  ngOnInit(): void {
    this.socialArray = Object.entries(this.user.profile?.social || {}).map(
      ([key, link]) => ({
        key,
        link,
      }),
    );
    this.socialArrayCopy = structuredClone(this.socialArray);
  }

  addNewSocial() {
    if (this.socialArray.length < 5) {
      this.socialArray.push({ key: this.availableSocials[0], link: '' });
    }
  }

  removeSocial(index: number) {
    this.socialArray.splice(index, 1);
  }

  saveChanges() {
    if (!this.areSocialArraysEqual(this.socialArray, this.socialArrayCopy)) {
      const userTemp: User = this.formatUser();

      this.updateUser({
        user: userTemp,
        updateCall: (user) => this.completeEdit(user),
      });
    } else {
      alert('non sono stati rilevati cambiamenti');
    }
  }

  private areSocialArraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;

    return a.every(
      (item, index) =>
        item.key === b[index].key &&
        item.link?.trim() === b[index].link?.trim(),
    );
  }

  private formatUser(): User {
    const updatedSocials = this.socialArray.reduce(
      (map, social) => {
        if (social.link?.trim()) map[social.key] = social.link.trim();
        return map;
      },
      {} as Record<string, string>,
    );

    const userTemp: User = structuredClone(DataHttp.profiloPersonale!.user);
    userTemp.profile!.social = updatedSocials;

    return userTemp;
  }

  private completeEdit(user: User): void {
    if (DataHttp.profiloPersonale) {
      DataHttp.profiloPersonale.user = user;
      this.chiudi.emit();
    }
  }

  private updateUser(params: {
    user: User;
    updateCall: (user: User) => void;
  }): void {
    updateUserCustom({
      authService: this.authService,
      user: params.user,
      finalizeFunc: () => {},
      valueContext: true,
    }).subscribe({
      next: () => params.updateCall(params.user),
      error: (err: string) =>
        alert("Si è verificato un errore durante l'aggiornamento: " + err),
    });
  }
}
