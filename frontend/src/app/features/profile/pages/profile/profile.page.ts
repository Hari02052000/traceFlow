import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { selectAuthUser } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CardComponent],
  template: `
    <main class="p-tf-6 lg:p-tf-10">
      <div class="mx-auto max-w-2xl">
        <h1 class="m-0 mb-tf-6 text-2xl font-bold text-tf-primary md:text-3xl">Profile</h1>
        @if (user(); as user) {
          <app-card padding="lg">
            <div class="grid gap-tf-6">
              <div class="flex items-center gap-tf-4">
                <span class="inline-flex size-14 items-center justify-center rounded-full bg-tf-surface-selected text-xl font-bold text-tf-action">{{ user.name.charAt(0).toUpperCase() }}</span>
                <div class="grid gap-tf-1">
                  <p class="m-0 text-lg font-semibold text-tf-primary">{{ user.name }}</p>
                  <p class="m-0 text-sm text-tf-secondary">{{ user.email }}</p>
                </div>
              </div>
              <div class="border-t border-tf-border pt-tf-4">
                <dl class="m-0 grid grid-cols-[auto_1fr] gap-x-tf-8 gap-y-tf-3">
                  <dt class="text-sm font-medium text-tf-tertiary">Name</dt>
                  <dd class="m-0 text-sm text-tf-primary">{{ user.name }}</dd>
                  <dt class="text-sm font-medium text-tf-tertiary">Email</dt>
                  <dd class="m-0 text-sm text-tf-primary">{{ user.email }}</dd>
                  <dt class="text-sm font-medium text-tf-tertiary">Role</dt>
                  <dd class="m-0 text-sm text-tf-primary">{{ user.role }}</dd>
                </dl>
              </div>
            </div>
          </app-card>
        }
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly store = inject(Store);
  protected readonly user = this.store.selectSignal(selectAuthUser);
}
