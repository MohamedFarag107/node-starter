import mongoose from 'mongoose';
import { env } from './env';
import logger from '@/common/utils/logger';

export const db_connection = async () => {
  try {
    const db = await mongoose.connect(env.DB_URI, {
      dbName: env.DB_NAME,
    });

    logger.info(`Database connected to ${db.connection.name}`);
  } catch (error) {
    logger.error(`Error while connecting to database: ${JSON.stringify(error)}`);
    process.exit(1);
  }
};
