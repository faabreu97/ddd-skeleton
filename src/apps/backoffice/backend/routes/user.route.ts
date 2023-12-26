import { Request, Response, Router } from 'express';
import { UserRequest, protectedRoute } from '.';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const backofficeUsersGetController = container.get(
    'Apps.Backoffice.Backend.controllers.BackofficeUsersGetController'
  );
  router.get('/users', protectedRoute, (req: Request, res: Response) =>
    backofficeUsersGetController.run(req as UserRequest, res)
  );
};
