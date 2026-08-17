import { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERATOR';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
