import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  template: `
    <main class="page-shell">
      <h1>Dashboard</h1>
      <p>Your TraceFlow batch overview will appear here.</p>
    </main>
  `,
})
export class DashboardPage {}
