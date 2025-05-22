import { NgFor, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../../../../auth/interfaces/users.interface';
import { EditableSocial } from '../../../../../../interfaces/profilo.interface';
import { TabProfiloCustom } from '../../../../custom/tab-profilo-custom.class';

@Component({
  selector: 'tab-social-profilo',
  standalone: true,
  imports: [NgFor, FormsModule, TitleCasePipe],
  templateUrl: './tab-social.component.html',
})
export class TabSocialComponent extends TabProfiloCustom implements OnInit {
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
      const userTemp = this.formatUser();

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
    const updatedSocials = this.socialArray.reduce((acc, curr) => {
      if (curr.link?.trim()) acc[curr.key] = curr.link.trim();
      return acc;
    }, {} as Record<string, string>);

    const userTemp = structuredClone(
      this.profiloService.profiloPersonale!.user
    );

    userTemp.profile!.social = updatedSocials as unknown as JSON;

    return userTemp;
  }

  private completeEdit(user: User): void {
    if (this.profiloService.profiloPersonale) {
      this.profiloService.profiloPersonale.user = user;
      sessionStorage.setItem(
        'pubblicazioni',
        JSON.stringify(this.profiloService.profiloPersonale)
      );
      this.chiudi.emit();
    }
  }
}
