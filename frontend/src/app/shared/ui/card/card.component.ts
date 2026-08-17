import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CardVariant = 'default' | 'outlined' | 'interactive';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  protected readonly variantClasses: Record<CardVariant, string> = { default: 'shadow-tf-sm', outlined: 'border border-tf-border', interactive: 'cursor-pointer border border-tf-border transition-[border-color,box-shadow] hover:border-tf-border-strong hover:shadow-tf-md' };
  protected readonly paddingClasses = { none: 'p-0', sm: 'p-tf-3', md: 'p-tf-6', lg: 'p-tf-8' };
}
