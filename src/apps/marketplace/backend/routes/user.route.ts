import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { validateReqSchema } from '.';
import LoginPostController from '../controllers/user/LoginPostController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isString().notEmpty().withMessage('Id is required'),
    body('name').exists().isString().notEmpty().withMessage('Name is required'),
    body('email')
      .exists()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is not a valid email'),
    body('password')
      .exists()
      .isString()
      .notEmpty()
      .withMessage('Password is required')
  ];

  const registerPutController = container.get(
    'Apps.Marketplace.Backend.controllers.RegisterPutController'
  );
  router.put(
    '/users/register/:id',
    reqSchema,
    validateReqSchema,
    (req: Request, res: Response) => registerPutController.run(req, res)
  );

  const loginReqSchema = [
    body('email').exists().isEmail(),
    body('password').exists().isString().notEmpty()
  ];

  const loginPostController: LoginPostController = container.get(
    'Apps.Marketplace.Backend.controllers.LoginPostController'
  );
  router.post(
    '/users/login',
    loginReqSchema,
    validateReqSchema,
    (req: Request, res: Response) => loginPostController.run(req, res)
  );
};
