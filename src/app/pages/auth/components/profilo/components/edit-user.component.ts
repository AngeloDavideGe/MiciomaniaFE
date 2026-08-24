import { Component, computed, inject, input, output } from '@angular/core';
import { MultiFormComponent } from '../../../../../../library/components/multi-form/multi-form.component';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { RecordStrutturaMultiForm } from '../../../../../../library/interfaces/form.interface';
import {
  User,
  UserToken,
} from '../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../shared/services/auth.service';
import { getEditUserForm } from '../../../functions/auth.function';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MultiFormComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  public authService = inject(AuthService);

  public currentUser = input.required<User | null>();
  public chiudi = output<void>();

  public formEditUser = computed<RecordStrutturaMultiForm>(() =>
    getEditUserForm(this.currentUser()),
  );

  public updateUser(value: EditUserFormValue): void {
    const user: User | null = this.currentUser();

    if (!user) {
      return;
    }

    const updatedUser: User = {
      ...user,
      credenziali: {
        ...user.credenziali,
        nome: value.account.nome,
        email: value.account.email,
        password: value.account.password,
      },
      iscrizione: {
        ...user.iscrizione,
        squadra: value.iscrizione.squadra || null,
        provincia:
          `${value.iscrizione.provincia} (${value.iscrizione.regione})` || null,
      },
      admin: {
        ...user.admin,
      },
      profile: {
        ...user.profile,
        compleanno: value.profile.compleanno || null,
        social: value.social
          .filter((social) => social.piattaforma && social.link)
          .reduce<Record<string, string>>(
            (social, item) => ({
              ...social,
              [item.piattaforma.trim()]: item.link.trim(),
            }),
            {},
          ),
      },
    };

    handlerFunc<void>({
      callHttp: () => this.authService.updateUser(updatedUser, true),
      nextCall: () => {
        this.authService.currentUser.set(updatedUser);
        this.authService.accountsUser.update((accounts) =>
          accounts.map((account) =>
            account.id === updatedUser.id ? updatedUser : account,
          ),
        );
        this.authService.currentUsersCaricati[updatedUser.id] = true;
        this.chiudi.emit();
      },
    });
  }
}

interface EditUserFormValue {
  account: {
    nome: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  profile: {
    compleanno: string;
  };
  social: {
    piattaforma: string;
    link: string;
  }[];
  iscrizione: {
    squadra: string;
    regione: string;
    provincia: string;
  };
}
