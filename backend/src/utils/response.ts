import { Response } from 'express';

export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  res.status(statusCode).json({ success: true, data });
}

export function sendPaginated<T>(res: Response, data: T[], pagination: { page: number; limit: number; total: number; totalPages: number }): void {
  res.status(200).json({ success: true, data, pagination });
}

export function sendError(res: Response, statusCode: number, code: string, message: string): void {
  res.status(statusCode).json({ success: false, error: { code, message } });
}
