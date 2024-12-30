import Database from 'better-sqlite3';
import { logger } from '../logger/logger-config';
import { TABLE_NAMES } from './types/database.types';

export const db = new Database('database.db', {
  verbose: (message) => logger.debug(message),
});

export function initializeDatabase() {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.USERS} (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
      );
      CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.EVENTS} (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        address TEXT,
        date TEXT,
        user_id TEXT,
        image TEXT,
        FOREIGN KEY (user_id) REFERENCES ${TABLE_NAMES.USERS}(id)
      );
      CREATE TABLE IF NOT EXISTS ${TABLE_NAMES.EVENT_REGISTRATIONS} (
        id INTEGER PRIMARY KEY,
        event_id TEXT,
        user_id TEXT,
        FOREIGN KEY (event_id) REFERENCES ${TABLE_NAMES.EVENTS}(id),
        FOREIGN KEY (user_id) REFERENCES ${TABLE_NAMES.USERS}(id)
      );
    `);
    logger.info('Database tables initialized successfully');
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
}
