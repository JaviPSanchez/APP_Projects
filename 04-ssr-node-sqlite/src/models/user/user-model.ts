import { CreateUserData } from './types/user-model.types';
import { User } from '../../types/shared.types';
import { db } from '../../config/database/database-config';
import { TABLE_NAMES } from '../../config/database/types/database.types';
import { logger } from '../../config/logger/logger-config';

import bcrypt from 'bcrypt';

export async function createUser(userData: CreateUserData): Promise<User> {
  const id = Math.random().toString(36).substring(2, 11);
  try {
    const stmt = db.prepare(
      `INSERT INTO ${TABLE_NAMES.USERS} (id, username, email, password) VALUES (?, ?, ?, ?)`
    );
    stmt.run(id, userData.username, userData.email, userData.password);
    return { id, ...userData };
  } catch (error) {
    logger.error({ error }, 'Error creating user');
    throw error;
  }
}

export async function verifyUserCredentials(
  email: string,
  password: string
): Promise<User | null> {
  try {
    logger.debug({ email }, 'Attempting to verify credentials');
    const stmt = db.prepare(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = ?`
    );
    const user = stmt.get(email) as User | undefined;

    if (!user) {
      logger.debug('User not found in database');
      return null;
    }

    logger.debug(
      {
        storedHash: user.password,
        providedPassword: password,
      },
      'Comparing passwords'
    );

    const isValidPassword = await bcrypt.compare(password, user.password);
    logger.debug(
      {
        isValidPassword,
        storedHash: user.password,
        providedPassword: password,
      },
      'Password verification result'
    );

    return isValidPassword ? user : null;
  } catch (error) {
    logger.error({ error }, 'Database error in verifyUserCredentials');
    throw error;
  }
}

export function findUserByUsername(username: string): User | undefined {
  const stmt = db.prepare(
    `SELECT * FROM ${TABLE_NAMES.USERS} WHERE username = ?`
  );
  return stmt.get(username) as User | undefined;
}

export function findUserByEmail(email: string): User | undefined {
  try {
    const stmt = db.prepare(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = ?`
    );
    const user = stmt.get(email) as User | undefined;
    logger.debug({ email, userFound: !!user }, 'findUserByEmail result');
    return user;
  } catch (error) {
    logger.error({ error }, 'Error in findUserByEmail');
    throw error;
  }
}
