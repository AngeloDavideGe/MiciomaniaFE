import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../../../../../shared/interfaces/users.interface';
import { EditableSocial } from '../../../../../../interfaces/profilo.interface';
import { TabProfiloBase } from '../../../base/tab-profilo.base';
import { DataHttp } from '../../../../../../../../core/api/http.data';

@Component({
  selector: 'tab-social-profilo',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './tab-social.component.html',
})
export class TabSocialComponent extends TabProfiloBase implements OnInit {
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

  @Input() user: User = {} as User;
  @Output() chiudi = new EventEmitter<void>();

  ngOnInit(): void {
    this.socialArray = Object.entries(this.user.profile?.social || {}).map(
      ([key, link]) => ({
        key,
        link,
      })
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
        item.key === b[index].key && item.link?.trim() === b[index].link?.trim()
    );
  }

  private formatUser(): User {
    const updatedSocials = this.socialArray.reduce((map, social) => {
      if (social.link?.trim()) map[social.key] = social.link.trim();
      return map;
    }, {} as Record<string, string>);

    const userTemp: User = structuredClone(DataHttp.profiloPersonale!.user);
    userTemp.profile!.social = updatedSocials as unknown as JSON;

    return userTemp;
  }

  private completeEdit(user: User): void {
    if (DataHttp.profiloPersonale) {
      DataHttp.profiloPersonale.user = user;
      this.chiudi.emit();
    }
  }
}
