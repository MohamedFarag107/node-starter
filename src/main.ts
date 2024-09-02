import '@/common/config/env';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import { env } from '@/common/config/env';
import { app } from '@/app';
import { setLocaleMiddleware } from '@/common/middleware/set-locale';
import { globalErrorMiddleware } from '@/common/middleware/global-error';
import { apiResponseMiddleware } from '@/common/middleware/api-response';
import { notFoundHandler } from '@/common/middleware/not-found';
import { db_connection } from '@/common/config/db';
import logger from '@/common/utils/logger';

// ======================== Importing Routes ========================
import { authRouter } from '@/auth/auth.router';

app.middlewares((application) => {
  application.use(morgan('dev'));
  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
  application.use(
    cors({
      origin: [env.CLIENT_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    }),
  );
  application.use(mongoSanitize());
  application.use(setLocaleMiddleware);
  application.use(apiResponseMiddleware);
});

app.mountRoutes((application) => {
  application.use('/api/v1/auth', authRouter);
  application.use('*', notFoundHandler);
  application.use(globalErrorMiddleware);
});

app.listen(env.PORT, async () => {
  await db_connection();
  await app.onMount();
});

// ======================== Event Listeners ========================
const EVENTS = [
  {
    name: 'SIGINT',
    cb: () => {
      logger.debug('Server is shutting down');
      app.onServerShutdown();
      process.exit(0);
    },
  },
  {
    name: 'unhandledRejection',
    cb: (err: unknown) => {
      logger.error(err);
      process.exit(1);
    },
  },
];

EVENTS.forEach(({ cb, name }) => process.on(name, cb));
