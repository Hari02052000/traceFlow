import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';
import { sendError } from '../utils/response';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.errorCode, err.message);
    return;
  }

  if (err.name === 'ValidationError') {
    sendError(res, 400, 'VALIDATION_ERROR', err.message);
    return;
  }

  if (err.name === 'CastError') {
    sendError(res, 400, 'INVALID_ID', 'Invalid resource ID');
    return;
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0];
    sendError(res, 409, 'DUPLICATE', `${field} already exists`);
    return;
  }

  console.error('Unexpected error:', err);
  sendError(res, 500, 'INTERNAL_ERROR', 'An unexpected error occurred');
}
