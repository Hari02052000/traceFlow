import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Output, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ThemePreference, ThemeService } from '../../services/theme.service';
import { selectAuthUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  private readonly themeService = inject(ThemeService);
  private readonly store = inject(Store);
  private readonly elementRef = inject(ElementRef);
  protected readonly open = signal(false);
  protected readonly preference = this.themeService.preference;
  protected readonly user = this.store.selectSignal(selectAuthUser);
  protected readonly userInitial = computed(() => this.user()?.name?.charAt(0).toUpperCase() ?? 'U');
  @Output() logoutRequested = new EventEmitter<void>();

  protected setTheme(preference: ThemePreference): void {
    this.themeService.setPreference(preference);
  }

  protected close(): void {
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.close();
    }
  }
}
