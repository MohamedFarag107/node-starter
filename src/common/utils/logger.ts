import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

import { LOG_DIR } from '@/common/constants/log-dir';
import { env } from '@/common/config/env';

const nestLikeFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}] - ${message}`;
});

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        colors: { info: 'green', error: 'red', warn: 'yellow', debug: 'blue' },
      }),
      winston.format.timestamp({ format: 'hh:mm A' }),
      nestLikeFormat,
    ),
  }),
];

if (env.isProduction) {
  transports.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d',
      utc: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        nestLikeFormat,
      ),
    }),
  );
}

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    nestLikeFormat,
  ),
  transports,
});

export default logger;
