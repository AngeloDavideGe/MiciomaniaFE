import { Injectable, signal } from '@angular/core';
import { BaseService } from '../../../library/services/base.service';
import { Social, Conquiste } from '../interfaces/mn.interface';
import { forkJoin, Observable } from 'rxjs';
import { MN } from '../interfaces/squadre.interface';

@Injectable({
  providedIn: 'root',
})
export class MNService extends BaseService {
  public social = signal<Social[]>([]);
  public mn = signal<MN[]>([]);
  public conquiste = signal<Conquiste | null>(null);

  public socialLoaded: boolean = false;
  public mneConquisteLoaded: boolean = false;

  constructor() {
    super('PY');
  }

  getSocialLinks(): Observable<Social[]> {
    return this.getCustom<Social[]>('squadre/get_social_links');
  }

  getMNeConquiste(): Observable<{ mn: MN[]; conquiste: Conquiste }> {
    return forkJoin({
      mn: this.getCustom<MN[]>('squadre/get_mn'),
      conquiste: this.postCustom<Conquiste>(
        'squadre/get_territori_conquistati',
      ),
    });
  }
}
