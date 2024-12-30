import pino from 'pino';
import { IncomingMessage } from 'http';

export const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  },
});

export const pinoHttpConfig = {
  logger,
  serializers: {
    req(req: IncomingMessage & { raw: { body: unknown } }) {
      return {
        ...req,
        body: req.raw.body,
      };
    },
  },
};
