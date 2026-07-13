import { Component } from '@angular/core';
import { ContaierMicioComponent } from '../../../../../shared/components/container-micio.component';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContaierMicioComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
