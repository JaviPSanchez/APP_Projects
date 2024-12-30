import { RequestHandler } from 'express';
import * as models from '../../models/events/events-model';
import { EventResponse } from './types/events-controller.types';
import { logger } from '../../config/logger/logger-config';

export const create: RequestHandler = async (req, res): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ error: 'User ID is required' });
    return;
  }

  const { title, description, address, date } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;

  if (!title?.trim() || !description?.trim() || !address?.trim() || !date) {
    res
      .status(400)
      .json({ error: 'All fields are required and cannot be empty' });
    return;
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    res.status(400).json({ error: 'Invalid date format' });
    return;
  }

  if (title.trim().length < 3) {
    res.status(400).json({ error: 'Title must be at least 3 characters long' });
    return;
  }

  if (description.trim().length < 10) {
    res
      .status(400)
      .json({ error: 'Description must be at least 10 characters long' });
    return;
  }

  if (address.trim().length < 5) {
    res
      .status(400)
      .json({ error: 'Address must be at least 5 characters long' });
    return;
  }

  try {
    await models.createEvent(
      {
        title: title.trim(),
        description: description.trim(),
        address: address.trim(),
        date: dateObj.toISOString(),
        user_id: req.user.id,
        image: imagePath,
      },
      req.user.id,
      imagePath
    );
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    if (req.file) {
      // If there was an error and a file was uploaded, we should handle cleanup here
      logger.error('Error creating event with image:', error);
    }
    res.status(500).json({ error: (error as any).message });
  }
};

export const edit: RequestHandler = async (req, res): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ error: 'User ID is required' });
    return;
  }

  const { id } = req.params;

  // Check if event exists and belongs to user
  const existingEvent = models.getEventById(id);
  if (!existingEvent) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  if (existingEvent.user_id !== req.user.id) {
    res.status(403).json({ error: 'Not authorized to edit this event' });
    return;
  }

  const { title, description, address, date } = req.body;
  const imagePath = req.file
    ? `/images/${req.file.filename}`
    : existingEvent.image;

  if (!title?.trim() || !description?.trim() || !address?.trim() || !date) {
    res
      .status(400)
      .json({ error: 'All fields are required and cannot be empty' });
    return;
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    res.status(400).json({ error: 'Invalid date format' });
    return;
  }

  if (title.trim().length < 3) {
    res.status(400).json({ error: 'Title must be at least 3 characters long' });
    return;
  }

  if (description.trim().length < 10) {
    res
      .status(400)
      .json({ error: 'Description must be at least 10 characters long' });
    return;
  }

  if (address.trim().length < 5) {
    res
      .status(400)
      .json({ error: 'Address must be at least 5 characters long' });
    return;
  }

  try {
    await models.editEvent(
      {
        id,
        title: title.trim(),
        description: description.trim(),
        address: address.trim(),
        date: dateObj.toISOString(),
        user_id: req.user.id,
        image: imagePath,
      },
      imagePath
    );
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    logger.error({ error }, 'Error updating event');
    res
      .status(500)
      .json({ error: `Error updating event: ${(error as any).message}` });
  }
};

export const deleteItem: RequestHandler<{ id: string }, EventResponse> = async (
  req,
  res
) => {
  const { id } = req.params;

  try {
    const event = models.getEventById(id);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    if (event.user_id !== req.user?.id) {
      res.status(403).json({ error: 'Not authorized to delete this event' });
      return;
    }

    await models.deleteEvent(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Event not deleted: ${(error as any).message}` });
  }
};

export const getAll: RequestHandler = async (_req, res) => {
  try {
    const events = models.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getSingle: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  try {
    const event = models.getEventById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const register: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  try {
    const event = models.getEventById(id);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    if (!req.user?.id) {
      res.status(401).json({ error: 'User ID is required' });
      return;
    }

    // Check if the user is already registered for the event
    const existingRegistration = models.getRegistrationByEventAndUser(
      id,
      req.user.id
    );
    if (existingRegistration) {
      res
        .status(400)
        .json({ error: 'User is already registered for this event' });
      return;
    }

    await models.registerForEvent(id, req.user.id);
    res.status(200).json({ message: 'Registered for event successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const unregister: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  try {
    const event = models.getEventById(id);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    if (!req.user?.id) {
      res.status(401).json({ error: 'User ID is required' });
      return;
    }
    await models.unregisterFromEvent(id, req.user.id);
    res.status(200).json({ message: 'Unregistered from event successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
