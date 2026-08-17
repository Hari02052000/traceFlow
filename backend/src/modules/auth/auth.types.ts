import { AuthUser } from '../../types/express.d';

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERATOR';
}

export type UserResponse = Omit<AuthUser, 'passwordHash'>;
