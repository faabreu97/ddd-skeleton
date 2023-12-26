import { Express } from 'express';
import StatusGetController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const register = (app: Express) => {
  const controller: StatusGetController = container.get(
    'Apps.Marketplace.Backend.controllers.StatusGetController'
  );
  app.get('/status', controller.run.bind(controller));
};
