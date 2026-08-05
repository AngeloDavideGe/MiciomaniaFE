import { Injectable, signal } from '@angular/core';
import { BaseService } from '../../../library/services/base.service';
import { Social, Conquiste, IFooter } from '../interfaces/mn.interface';
import { forkJoin, Observable } from 'rxjs';
import { MN } from '../interfaces/squadre.interface';

@Injectable({
  providedIn: 'root',
})
export class MNService extends BaseService {
  public social = signal<Social[]>([]);
  public mn = signal<MN[]>([]);
  public conquiste = signal<Conquiste | null>(null);
  public footer = signal<IFooter | null>(null);

  public socialLoaded: boolean = false;
  public mnLoaded: boolean = false;
  public conquisteLoaded: boolean = false;
  public footerLoaded: boolean = false;

  constructor() {
    super('PY');
  }

  getSocialLinks(): Observable<Social[]> {
    return this.getCustom<Social[]>('squadre/get_social_links');
  }

  getFooter(): Observable<IFooter> {
    return this.getCustom<IFooter>('squadre/get_footer');
  }

  getMN(): Observable<MN[]> {
    return this.getCustom<MN[]>('squadre/get_mn');
  }

  getConquiste(): Observable<Conquiste> {
    return this.postCustom<Conquiste>('squadre/get_territori_conquistati');
  }
}
