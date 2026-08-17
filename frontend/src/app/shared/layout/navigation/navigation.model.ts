import { UserRole } from '../../../core/models/auth.models';

export type { UserRole };

export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  roles: readonly UserRole[];
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: '▦', roles: ['ADMIN', 'OPERATOR'] },
  { label: 'Batches', route: '/batches', icon: '□', roles: ['ADMIN', 'OPERATOR'] },
  { label: 'Create batch', route: '/admin/batches/create', icon: '+', roles: ['ADMIN'] },
  { label: 'Profile', route: '/profile', icon: '◉', roles: ['ADMIN', 'OPERATOR'] },
];
