import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemePreference, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  private readonly themeService = inject(ThemeService);
  protected readonly open = signal(false);
  protected readonly preference = this.themeService.preference;
  @Output() logoutRequested = new EventEmitter<void>();

  protected setTheme(preference: ThemePreference): void {
    this.themeService.setPreference(preference);
  }

  protected close(): void {
    this.open.set(false);
  }
}
