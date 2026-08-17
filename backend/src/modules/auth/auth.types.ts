export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERATOR';
}
