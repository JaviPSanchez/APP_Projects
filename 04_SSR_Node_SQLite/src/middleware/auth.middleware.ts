import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import './types/middleware.types';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  // If header exists, split on space and take second part (the token)
  // If header doesn't exist, token will be undefined
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Authentication token is required' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }

  req.user = decoded;
  next();
}
