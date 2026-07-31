import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { Canzoni } from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { canzoni_imports } from './canzoni.import';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: canzoni_imports,
  templateUrl: './canzoni.component.html',
  styleUrl: './canzoni.component.scss',
})
export class CanzoniComponent implements OnInit {
  private opereService = inject(OpereService);

  public searchQuery = signal<string>('');
  public debaunceQuery = signal<string>('');

  public canzoni = computed<iCard[]>(() => []);

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debaunceQuery.set(value),
    );
  }

  ngOnInit(): void {
    handlerFunc<Canzoni[]>({
      skipCall: this.opereService.canzoniLoaded,
      callHttp: () => this.opereService.getAllCanzoni(),
      nextCall: (data: Canzoni[]) => this.opereService.canzoni.set(data),
      errorCall: () => (this.opereService.canzoniLoaded = false),
    });

    this.opereService.canzoniLoaded = true;
  }
}
