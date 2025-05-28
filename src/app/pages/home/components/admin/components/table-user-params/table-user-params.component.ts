import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  User,
  UserParams,
} from '../../../../../../shared/interfaces/users.interface';
import { Router } from '@angular/router';
import { Ruolo } from '../../../../../auth/enums/users.enum';

@Component({
  selector: 'app-table-user-params',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './table-user-params.component.html',
})
export class TableUserParamsComponent implements OnInit {
  @Input() ruolo!: Ruolo;
  @Input() userMap!: UserParams[];
  @Input() user: User | null = null;
  @Output() modificaRuolo = new EventEmitter<UserParams>();
  @Output() eliminaRuolo = new EventEmitter<UserParams>();

  public userTable: UserParams[] = [];
  public currentPage: number = 1;
  public totalPages: number = 0;

  public router = inject(Router);

  ngOnInit(): void {
    this.userTable = this.userMap.slice(0, 5);
    this.totalPages = Math.ceil(this.userMap.length / 5);
  }

  modificaRuoloFunction(user: UserParams): void {
    if (this.controlliCustom('modificare', user) === -1) {
      return;
    }
    this.modificaRuolo.emit(user);
  }

  deleteRuoloFunction(user: UserParams): void {
    if (this.controlliCustom('eliminare', user) === -1) {
      return;
    }
    this.eliminaRuolo.emit(user);
  }

  private controlliCustom(str: string, user: UserParams): number {
    if (this.user?.credenziali.ruolo !== Ruolo.MICIOMANE || !this.user) {
      alert(`Non hai i permessi per ${str} questo ruolo.`);
      return -1;
    }

    if (user.id == this.user.id) {
      alert(`Non puoi ${str} il tuo ruolo.`);
      return -1;
    }

    return 0;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.userTable = this.userMap.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.userTable = this.userMap.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
    }
  }
}
