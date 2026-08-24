import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiFormComponent } from '../../../../library/components/multi-form/multi-form.component';
import { handlerFunc } from '../../../../library/functions/handler.function';
import { RecordStrutturaMultiForm } from '../../../../library/interfaces/form.interface';
import { User, UserToken } from '../../../shared/interfaces/users.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { getEditUserForm } from '../functions/auth.function';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MultiFormComponent],
  template: ` <div class="login-page">
    <section class="login-container">
      <div class="login-header">
        <div class="header-text">
          <h1>Modifica profilo</h1>
          <p>Aggiorna i tuoi dati personali e social</p>
        </div>
      </div>

      <div class="form-container">
        <app-multi-form
          [strutturaForm]="formEditUser()"
          (invioDati)="updateUser($event)"
          (secondaryButton)="router.navigate(['home'])"
        ></app-multi-form>
      </div>
    </section>
  </div>`,
  styleUrl: '../styles/auth.style.scss',
})
export class EditUserComponent implements OnInit {
  public router = inject(Router);
  public authService = inject(AuthService);

  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );
  public formEditUser = computed<RecordStrutturaMultiForm>(() =>
    getEditUserForm(this.authService.currentUser()),
  );

  ngOnInit(): void {
    const user: User | null = this.currentUser();
    const userCaricati = this.authService.currentUsersCaricati;

    if (user) {
      const email: string = user.credenziali.email;
      const password: string = user.credenziali.password;
      const idUser: string = user.id;
      const logged: boolean = userCaricati[idUser] || false;

      handlerFunc<UserToken>({
        skipCall: logged,
        callHttp: () =>
          this.authService.getUserByEmailAndPassword(email, password),
        nextCall: (data: UserToken) =>
          this.authService.currentUser.set(data.user),
        errorCall: () =>
          (this.authService.currentUsersCaricati[idUser] = false),
      });

      this.authService.currentUsersCaricati[idUser] = true;
    }
  }

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
        provincia: value.iscrizione.provincia || null,
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
        this.router.navigate(['home']);
      },
    });
  }
}

interface EditUserFormValue {
  account: {
    nome: string;
    email: string;
    password: string;
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
    provincia: string;
  };
}
