import { Request, Response } from 'express';
import { verifyUserCredentials } from '../../models/user/user-model';
import { LoginRequest, UserResponse } from './types/login-controller.types';
import { ErrorResponse } from '../../types/shared.types';
import { logger } from '../../config/logger/logger-config';
import { generateToken } from '../../utils/auth';

export async function login(
  req: Request<{}, UserResponse | ErrorResponse, LoginRequest>,
  res: Response<UserResponse | ErrorResponse>
) {
  const { email, password } = req.body;
  logger.debug({ email }, 'Login attempt');

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.trim() === '') {
    res.status(400).json({ error: 'Invalid email format or empty email' });
    return;
  }

  // Password validation
  if (password.length < 6) {
    res
      .status(400)
      .json({ error: 'Password must be at least 6 characters long' });
    return;
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    res.status(400).json({
      error:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    });
    return;
  }

  try {
    const user = await verifyUserCredentials(email, password);

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email });
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error verifying credentials' });
    return;
  }
}
