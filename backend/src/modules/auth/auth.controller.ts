import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../utils/response';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const user = await authService.register(req.body, res);
    sendSuccess(res, user, 201);
  }

  async login(req: Request, res: Response): Promise<void> {
    const user = await authService.login(req.body, res);
    sendSuccess(res, user);
  }

  logout(req: Request, res: Response): void {
    authService.logout(res);
    sendSuccess(res, null);
  }

  async me(req: Request, res: Response): Promise<void> {
    const user = await authService.getMe(req.user!.id);
    sendSuccess(res, user);
  }
}

export const authController = new AuthController();
