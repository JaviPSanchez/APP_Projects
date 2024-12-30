import app from './app';
import { logger } from './config/logger/logger-config';
import { initializeDatabase } from './config/database/database-config';

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  try {
    initializeDatabase();
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
  }
});
