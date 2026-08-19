import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMicioService } from './base-micio.service';
import { Conquiste, IFooter, MN, Social } from '../interfaces/mn.interface';

@Injectable({
  providedIn: 'root',
})
export class MNService extends BaseMicioService {
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
