import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { AppError } from '../../errors/app-error';
import { userRepository } from '../users/user.repository';
import { JwtPayload } from './auth.types';
import { Response } from 'express';

const SALT_ROUNDS = 12;

function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn as any });
}

function setAuthCookie(res: Response, token: string): void {
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: config.cookieMaxAge,
  });
}

function toUserResponse(user: any) {
  return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}

export class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError('Email already registered', 409, 'DUPLICATE_EMAIL');
    }

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = await userRepository.create({ ...data, passwordHash });

    const tokenPayload: JwtPayload = { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
    return { user: toUserResponse(user), token: signToken(tokenPayload) };
  }

  async login(data: { email: string; password: string }, res: Response) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const tokenPayload: JwtPayload = { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
    const token = signToken(tokenPayload);
    setAuthCookie(res, token);

    return toUserResponse(user);
  }

  logout(res: Response): void {
    res.clearCookie('token', { path: '/' });
  }

  async getMe(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return toUserResponse(user);
  }
}

export const authService = new AuthService();
