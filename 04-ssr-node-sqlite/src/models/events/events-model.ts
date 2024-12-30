import {
  Event,
  CreateEventData,
  UpdateEventData,
} from './types/events-model.types';
import { db } from '../../config/database/database-config';
import { logger } from '../../config/logger/logger-config';
import { TABLE_NAMES } from '../../config/database/types/database.types';

export async function createEvent(
  eventData: CreateEventData,
  userId: string,
  imagePath: string | null
): Promise<Event> {
  const id = Math.random().toString(36).substring(2, 11);
  const event = { ...eventData, id, user_id: userId, image: imagePath };

  const stmt = db.prepare(
    `INSERT INTO ${TABLE_NAMES.EVENTS} (id, title, description, address, date, user_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  stmt.run(
    event.id,
    event.title,
    event.description,
    event.address,
    event.date,
    event.user_id,
    event.image
  );

  return event;
}

export async function editEvent(
  eventData: UpdateEventData,
  imagePath: string | null
): Promise<void> {
  try {
    const stmt = db.prepare(
      `UPDATE ${TABLE_NAMES.EVENTS}
       SET title = ?, description = ?, address = ?, date = ?, user_id = ?, image = ?
       WHERE id = ? AND user_id = ?`
    );
    stmt.run(
      eventData.title,
      eventData.description,
      eventData.address,
      eventData.date,
      eventData.user_id,
      imagePath,
      eventData.id,
      eventData.user_id
    );
    logger.info(`Event with id: ${eventData.id} updated successfully`);
  } catch (error) {
    logger.error({ error }, 'Error updating event');
    throw error;
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    const stmt = db.prepare(`DELETE FROM events WHERE id = ?`);
    stmt.run(id);
    logger.info(`Event with id: ${id} deleted successfully`);
  } catch (error) {
    logger.error({ error }, 'Error deleting event');
    throw error;
  }
}

export function getAllEvents(): Event[] {
  try {
    const stmt = db.prepare(`SELECT * FROM events`);
    return stmt.all() as Event[];
  } catch (error) {
    logger.error({ error }, 'Error fetching all events');
    throw error;
  }
}

export function getEventById(id: string): Event | undefined {
  try {
    const stmt = db.prepare(`SELECT * FROM events WHERE id = ?`);
    return stmt.get(id) as Event | undefined;
  } catch (error) {
    logger.error({ error }, 'Error fetching event by id');
    throw error;
  }
}

export async function registerForEvent(
  eventId: string,
  userId: string
): Promise<void> {
  try {
    const stmt = db.prepare(
      `INSERT INTO ${TABLE_NAMES.EVENT_REGISTRATIONS} (event_id, user_id) VALUES (?, ?)`
    );
    stmt.run(eventId, userId);
    logger.info(
      `User with id: ${userId} registered for event with id: ${eventId}`
    );
  } catch (error) {
    logger.error({ error }, 'Error registering for event');
    throw error;
  }
}

export async function unregisterFromEvent(
  eventId: string,
  userId: string
): Promise<void> {
  try {
    const stmt = db.prepare(
      `DELETE FROM ${TABLE_NAMES.EVENT_REGISTRATIONS} WHERE event_id = ? AND user_id = ?`
    );
    stmt.run(eventId, userId);
    logger.info(
      `User with id: ${userId} unregistered from event with id: ${eventId}`
    );
  } catch (error) {
    logger.error({ error }, 'Error unregistering from event');
    throw error;
  }
}

export function getRegistrationByEventAndUser(
  eventId: string,
  userId: string
): { event_id: string; user_id: string } | undefined {
  try {
    const stmt = db.prepare(
      `SELECT * FROM ${TABLE_NAMES.EVENT_REGISTRATIONS} WHERE event_id = ? AND user_id = ?`
    );
    return stmt.get(eventId, userId) as
      | { event_id: string; user_id: string }
      | undefined;
  } catch (error) {
    logger.error({ error }, 'Error fetching registration by event and user');
    throw error;
  }
}
