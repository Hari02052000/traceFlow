import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { MobileNavDrawerComponent } from '../mobile-nav-drawer/mobile-nav-drawer.component';
import { NAVIGATION_ITEMS, UserRole } from '../navigation/navigation.model';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [AppHeaderComponent, MobileNavDrawerComponent, RouterOutlet, SidebarNavComponent],
  templateUrl: './app-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  /** Supplied by auth state later; defaults to the operator navigation for now. */
  readonly role = input<UserRole>('OPERATOR');
  @Output() logoutRequested = new EventEmitter<void>();

  protected readonly mobileNavOpen = signal(false);
  protected readonly navigationItems = computed(() =>
    NAVIGATION_ITEMS.filter((item) => item.roles.includes(this.role())),
  );
}
