import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationItem } from '../navigation/navigation.model';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { DrawerComponent } from '../../ui/drawer/drawer.component';

@Component({
  selector: 'app-mobile-nav-drawer',
  standalone: true,
  imports: [DrawerComponent, SidebarNavComponent],
  templateUrl: './mobile-nav-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavDrawerComponent {
  @Input() open = false;
  @Input() items: readonly NavigationItem[] = [];
  @Output() closed = new EventEmitter<void>();
}
