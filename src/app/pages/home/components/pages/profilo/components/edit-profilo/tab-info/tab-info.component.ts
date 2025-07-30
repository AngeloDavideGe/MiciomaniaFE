import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { compareObjectCustom } from '../../../../../../../../shared/functions/utilities.function';
import { StatoPersona } from '../../../../../../../auth/enums/users.enum';
import { User } from '../../../../../../../../shared/interfaces/users.interface';
import { TabProfiloBase } from '../../../base/tab-profilo.base';
import { DataHttp } from '../../../../../../../../core/api/http.data';

@Component({
  selector: 'tab-info-profilo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tab-info.component.html',
})
export class TabInfoComponent extends TabProfiloBase {
  public bottoneDisabilitato: boolean = false;
  public profileForm: FormGroup;
  public statiPersona = Object.values(StatoPersona);

  @Input() user: User = {} as User;
  @Output() chiudi = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    super();
    this.profileForm = this.fb.group({
      nome: [''],
      email: [''],
      password: [''],
      bio: [''],
      telefono: [''],
      compleanno: [''],
      // social: [''],
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      nome: this.user.credenziali.nome,
      email: this.user.credenziali.email,
      password: this.user.credenziali.password,
      bio: this.user.profile?.bio,
      telefono: this.user.profile?.telefono,
      compleanno: this.user.profile?.compleanno,
    });
  }

  onSave(): void {
    const updatedUser = this.getUpdateUser();

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

  private getUpdateUser(): User {
    return {
      ...this.user, // per i valori che mancano
      credenziali: {
        ...this.user.credenziali,
        nome: this.profileForm.value.nome,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password,
      },
      iscrizione: {
        ...this.user.iscrizione,
      },
      profile: {
        ...this.user.profile,
        bio: this.profileForm.value.bio,
        telefono: this.profileForm.value.telefono,
        compleanno: this.profileForm.value.compleanno,
        social: this.user.profile?.social || null,
      },
    };
  }

  private areUsersEqual(user1: User, user2: User): boolean {
    const credenzia: boolean = compareObjectCustom(
      user1.credenziali,
      user2.credenziali
    );
    const iscrizione: boolean = compareObjectCustom(
      user1.iscrizione,
      user2.iscrizione
    );
    const profilo: boolean = compareObjectCustom(user1.profile, user2.profile);

    return credenzia && iscrizione && profilo;
  }
}
