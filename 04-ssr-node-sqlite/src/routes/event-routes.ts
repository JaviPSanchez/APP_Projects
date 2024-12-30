import { Router } from 'express';
import * as events from '../controllers/events/events-controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { upload } from '../utils/upload';

const router = Router();

// Route to create a new event
router.post('/', authenticateToken, upload.single('image'), events.create);

// Route to edit an event by id
router.put('/:id', authenticateToken, upload.single('image'), events.edit);

// Route to delete an event by id
router.delete('/:id', authenticateToken, events.deleteItem);

// Route to get all events
router.get('/', events.getAll);

// Route to get a single event by id
router.get('/:id', events.getSingle);

// Route to register for an event
router.post('/:id/register', authenticateToken, events.register);

// Route to unregister from an event
router.delete('/:id/unregister', authenticateToken, events.unregister);

export default router;
