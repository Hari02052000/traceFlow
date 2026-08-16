import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CardVariant = 'default' | 'outlined' | 'interactive';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
}
