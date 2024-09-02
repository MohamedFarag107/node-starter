import express, { Application } from 'express';
import { createServer, Server } from 'node:http';
import { Socket, Server as SocketServer } from 'socket.io';

import logger from '@/common/utils/logger';
import { createAdminsOnServerStart } from '@/common/runner/admin';
import { SocketEvents } from '@/common/types/socket-events';
import { env } from '@/common/config/env';

export class App {
  server: Server;
  app: Application;
  io: SocketServer;
  socketConnections: Map<string, Socket> = new Map();
  joiners: Map<string, Socket> = new Map();

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server);
    this.ioMount();
  }

  private ioMount(): void {
    logger.info('Initializing Socket');
    this.io.on(SocketEvents.CONNECTION, (socket) => {
      this.socketConnections.set(socket.id, socket);
      socket.on(SocketEvents.DISCONNECT, () => {
        this.socketConnections.delete(socket.id);
      });

      socket.on(SocketEvents.JOIN, (id) => {
        socket.join(id);
        this.joiners.set(id, socket);
      });

      socket.on(SocketEvents.LEAVE, (id) => {
        socket.leave(id);
        this.joiners.delete(id);
      });
    });
  }

  middlewares(cb: (app: Application) => void): void {
    logger.info('Initializing Middlewares');
    cb(this.app);
  }

  mountRoutes(cb: (app: Application) => void): void {
    logger.info('Initializing Routes');
    cb(this.app);
  }

  onServerShutdown() {
    this.io.close();
    this.server.close(() => {
      logger.info('Server is closed');
    });
  }

  async onMount() {
    await createAdminsOnServerStart();
  }

  listen(port: number, callback: () => void): Server {
    logger.info(`Server is running on ${env.SERVER_URL}`);
    logger.info(`Environment: ${env.NODE_ENV}`);
    return this.server.listen(port, callback);
  }
}

export const app = new App();
