import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  PathSvgCustom,
  SvgCustomComponent,
} from '../../../../../../../assets/components/svg-custom.component';

@Component({
  selector: 'app-ruota-custom',
  templateUrl: './ruota-custom.component.html',
  styleUrl: './ruota-custom.component.scss',
  imports: [SvgCustomComponent],
})
export class RuotaCustomComponent implements OnInit {
  public score = signal<string>('0');
  public spinning = signal<boolean>(false);
  public rotation = signal<number>(0);
  public segments: PathSvgCustom[] = [];
  private currentRotation: number = 0;
  private animationFrame: number = 0;

  @Output() resultSpin = new EventEmitter<string>();
  @Input() baseSegments!: BaseSegment[];

  ngOnInit(): void {
    const center: number = 150;
    const radius: number = 140;

    const total: number = this.baseSegments.length;
    const anglePerSegment: number = (2 * Math.PI) / total;

    this.segments = this.baseSegments.map((segment, index) => {
      const startAngle: number = index * anglePerSegment - Math.PI / 2;
      const endAngle: number = (index + 1) * anglePerSegment - Math.PI / 2;

      const x1: number = center + radius * Math.cos(startAngle);
      const y1: number = center + radius * Math.sin(startAngle);
      const x2: number = center + radius * Math.cos(endAngle);
      const y2: number = center + radius * Math.sin(endAngle);

      const largeArc: number = anglePerSegment > Math.PI ? 1 : 0;

      const d: string = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      const textRadius: number = radius * 0.7;
      const midAngle: number = startAngle + anglePerSegment / 2;

      const textX: number = center + textRadius * Math.cos(midAngle);
      const textY: number = center + textRadius * Math.sin(midAngle);

      return {
        title: segment.value,
        fill: segment.color,
        d,
        textX,
        textY,
      };
    });
  }

  spin(): void {
    if (this.spinning()) return;

    this.spinning.set(true);

    const segmentAngle: number = 360 / this.segments.length;
    const targetAngle: number =
      segmentAngle * Math.floor(Math.random() * this.segments.length);

    const startRotation: number = this.currentRotation;
    const totalRotation: number = startRotation + 270 - targetAngle + 5 * 360;
    const startTime: number = performance.now();

    const animate = (currentTime: number): void => {
      const progress: number = Math.min((currentTime - startTime) / 2500, 1);
      this.currentRotation =
        startRotation +
        (totalRotation - startRotation) * (1 - Math.pow(1 - progress, 3));

      this.rotation.set(this.currentRotation);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.currentRotation = totalRotation;
        this.rotation.set(this.currentRotation);

        const normalizedRotation: number =
          (360 - (this.currentRotation % 360)) % 360;
        const segmentIndex: number =
          Math.floor(normalizedRotation / segmentAngle) % this.segments.length;

        this.score.set(this.segments[segmentIndex].title);
        this.resultSpin.emit(this.score());

        this.spinning.set(false);
        cancelAnimationFrame(this.animationFrame);
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }
}

export interface BaseSegment {
  value: string;
  color: string;
}
