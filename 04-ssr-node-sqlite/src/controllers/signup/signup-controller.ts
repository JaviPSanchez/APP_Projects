import { Request, Response } from 'express';
import {
  createUser,
  findUserByUsername,
  findUserByEmail,
} from '../../models/user/user-model';
import { SignupRequest, UserResponse } from './types/signup-controller.types';
import { ErrorResponse } from '../../types/shared.types';
import bcrypt from 'bcrypt';
import { logger } from '../../config/logger/logger-config';
import { generateToken } from '../../utils/auth';

export async function signup(
  req: Request<{}, UserResponse | ErrorResponse, SignupRequest>,
  res: Response<UserResponse | ErrorResponse>
) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Username validation
  if (username.length < 3 || username.length > 20) {
    res
      .status(400)
      .json({ error: 'Username must be between 3 and 20 characters' });
    return;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    res.status(400).json({
      error: 'Username can only contain letters, numbers and underscores',
    });
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

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (findUserByUsername(username) || findUserByEmail(email)) {
    res.status(400).json({ error: 'Username or email already exists' });
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    logger.debug('Password hashed successfully');

    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });
    logger.debug({ email }, 'User created successfully');

    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateToken({ id: newUser.id, email: newUser.email });

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    logger.error({ error }, 'Error in signup');
    res.status(500).json({ error: 'Error creating user' });
  }
}
