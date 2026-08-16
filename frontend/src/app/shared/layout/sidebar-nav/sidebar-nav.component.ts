import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../navigation/navigation.model';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarNavComponent {
  @Input() items: readonly NavigationItem[] = [];
  @Input() showBrand = true;
  @Output() navigated = new EventEmitter<void>();
}
