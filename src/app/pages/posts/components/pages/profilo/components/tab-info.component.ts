import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { FormCustomComponent } from '../../../../../../../library/components/form/form.component';
import { compareObjectCustom } from '../../../../../../../library/functions/confronto.function';
import { RecordStruttura } from '../../../../../../../library/interfaces/form.interface';
import { DataHttp } from '../../../../../../core/api/http.data';
import { StatoPersona } from '../../../../../../shared/enums/users.enum';
import { TabProfiloBase } from '../base/tab-profilo.base';
import { ProfiloLang } from '../languages/interfaces/profilo-lang.interface';

@Component({
  selector: 'tab-info-profilo',
  standalone: true,
  imports: [FormCustomComponent],
  template: `
    <app-form-custom
      [strutturaForm]="tabInfoConfig"
      (invioDati)="onSave($event)"
    >
    </app-form-custom>
  `,
})
export class TabInfoComponent extends TabProfiloBase implements OnInit {
  public bottoneDisabilitato: boolean = false;
  public statiPersona = Object.values(StatoPersona);
  public tabInfoConfig: RecordStruttura = {};

  @Input() profiloLang!: ProfiloLang;
  @Input() user: User = {} as User;
  @Output() chiudi = new EventEmitter<void>();

  ngOnInit(): void {
    this.tabInfoConfig = {
      nome: {
        titolo: this.profiloLang.nome,
        valueInit: this.user.credenziali.nome,
        validators: [Validators.required],
        tipo: 'Text',
        errorMessage: 'Campo Obbligatorio',
      },
      email: {
        titolo: 'Email',
        valueInit: this.user.credenziali.email,
        validators: [Validators.required, Validators.email],
        tipo: 'Text',
        errorMessage: 'Campo Obbligatorio (prova@ex)',
      },
      password: {
        titolo: 'Password',
        valueInit: this.user.credenziali.password,
        validators: [Validators.required, Validators.minLength(6)],
        tipo: 'Password',
        errorMessage: 'Campo Obbligatorio (Almeno 6 lettere)',
      },
      bio: {
        titolo: 'Bio',
        valueInit: this.user.profile.bio || '',
        validators: [],
        tipo: 'Textarea',
      },
      telefono: {
        titolo: this.profiloLang.telefono,
        valueInit: this.user.profile.telefono || '',
        validators: [Validators.minLength(9), Validators.maxLength(9)],
        tipo: 'Text',
        errorMessage: 'Campo Obbligatorio 9 numeri)',
      },
      compleanno: {
        titolo: this.profiloLang.compleanno,
        // valueInit: this.user.profile.compleanno || '',
        validators: [],
        tipo: 'Date',
      },
    };
  }

  onSave(params: any): void {
    const updatedUser = this.getUpdateUser(params);

    if (this.areUsersEqual(updatedUser, this.user)) {
      alert('Nessuna modifica rilevata');
      return;
    }

    this.updateUser({
      user: updatedUser,
      updateCall: (user) => this.completeEdit(user),
    });
  }

  private completeEdit(user: User): void {
    if (DataHttp.profiloPersonale) {
      DataHttp.profiloPersonale.user = user;
      this.bottoneDisabilitato = true;
      this.chiudi.emit();
    }
  }

  private getUpdateUser(params: any): User {
    return {
      ...this.user,
      credenziali: {
        ...this.user.credenziali,
        nome: params.nome,
        email: params.email,
        password: params.password,
      },
      iscrizione: {
        ...this.user.iscrizione,
      },
      profile: {
        ...this.user.profile,
        bio: params.bio,
        telefono: params.telefono,
        compleanno: params.compleanno,
        social: this.user.profile?.social || null,
      },
    };
  }

  private areUsersEqual(user1: User, user2: User): boolean {
    const credenzia: boolean = compareObjectCustom(
      user1.credenziali,
      user2.credenziali,
    );
    const iscrizione: boolean = compareObjectCustom(
      user1.iscrizione,
      user2.iscrizione,
    );
    const profilo: boolean = compareObjectCustom(user1.profile, user2.profile);

    return credenzia && iscrizione && profilo;
  }
}
