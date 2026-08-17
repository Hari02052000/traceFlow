import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { MobileNavDrawerComponent } from '../mobile-nav-drawer/mobile-nav-drawer.component';
import { NAVIGATION_ITEMS, UserRole } from '../navigation/navigation.model';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';
import { selectUserRole } from '../../../store/auth/auth.selectors';
import { logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [AppHeaderComponent, MobileNavDrawerComponent, RouterOutlet, SidebarNavComponent],
  templateUrl: './app-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly store = inject(Store);

  protected readonly mobileNavOpen = signal(false);
  protected readonly navigationItems = computed(() => {
    const role = this.store.selectSignal(selectUserRole)() ?? 'OPERATOR' as UserRole;
    return NAVIGATION_ITEMS.filter((item) => item.roles.includes(role));
  });

  protected onLogout(): void {
    this.store.dispatch(logout());
  }
}
