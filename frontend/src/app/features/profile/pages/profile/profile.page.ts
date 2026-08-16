import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  template: `
    <main class="page-shell">
      <h1>Profile</h1>
      <p>Your TraceFlow account information will appear here.</p>
    </main>
  `,
})
export class ProfilePage {}
