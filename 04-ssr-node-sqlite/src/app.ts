import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import userRoutes from './routes/user-routes';
import healthRoutes from './routes/health-routes';
import eventRoutes from './routes/event-routes';
import dotenv from 'dotenv';

import { pinoHttpConfig } from './config/logger/logger-config';

dotenv.config();

const app = express();

// 1) MIDDLEWARES

// Add pino logger middleware
app.use(pinoHttp(pinoHttpConfig));

// CORS
app.use(cors());

// Body Parser
app.use(express.json());

// Static files
app.use(express.static('public'));

// 2) ROUTES
app.use('/api/health', healthRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// 3) SERVER --> server.ts

export default app;
