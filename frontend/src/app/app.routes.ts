import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login | TraceFlow',
    canMatch: [noAuthGuard],
    loadComponent: () => import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    title: 'Register | TraceFlow',
    canMatch: [noAuthGuard],
    loadComponent: () => import('./features/auth/pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('./shared/layout/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Dashboard | TraceFlow',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'batches',
        title: 'Batches | TraceFlow',
        loadComponent: () => import('./features/batches/pages/batch-list/batch-list.page').then((m) => m.BatchListPage),
      },
      {
        path: 'batches/:id',
        title: 'Batch details | TraceFlow',
        loadComponent: () => import('./features/batches/pages/batch-details/batch-details.page').then((m) => m.BatchDetailsPage),
      },
      {
        path: 'admin/batches/create',
        title: 'Create batch | TraceFlow',
        canMatch: [adminGuard],
        loadComponent: () => import('./features/batches/pages/create-batch/create-batch.page').then((m) => m.CreateBatchPage),
      },
      {
        path: 'profile',
        title: 'Profile | TraceFlow',
        loadComponent: () => import('./features/profile/pages/profile/profile.page').then((m) => m.ProfilePage),
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
