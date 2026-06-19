import { Injectable, signal } from '@angular/core';
import { BaseService } from '../../../../library/services/base.service';
import { Social, Conquiste } from '../../interfaces/github.interface';
import { Observable } from 'rxjs';
import { MN } from '../../interfaces/squadre.interface';

@Injectable({
  providedIn: 'root',
})
export class MNService extends BaseService {
  public social = signal<Social[]>([]);
  public mn = signal<MN[]>([]);
  public conquiste = signal<Conquiste | null>(null);

  public socialLoaded: boolean = false;
  public mnLoaded: boolean = false;
  public conquisteLoaded: boolean = false;

  constructor() {
    super('PY');
  }

  getMN(): Observable<MN[]> {
    return this.getCustom<MN[]>('squadre/get_mn');
  }

  getSocialLinks(): Observable<Social[]> {
    return this.getCustom<Social[]>('squadre/get_social_links');
  }
}
