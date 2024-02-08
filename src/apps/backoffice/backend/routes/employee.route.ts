import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { UserRequest, protectedRoute, validateReqSchema } from '.';
import EmployeesGetController from '../controllers/employee/EmployeesGetController';
import LoginPostController from '../controllers/employee/LoginPostController';
import ProfileGetController from '../controllers/employee/ProfileGetController';
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
      .withMessage('Password is required'),
    body('role').exists().isString().notEmpty().withMessage('Role is required')
  ];

  const registerPutController = container.get(
    'Apps.Backoffice.Backend.controllers.RegisterPutController'
  );
  router.put(
    '/employees/register/:id',
    protectedRoute,
    reqSchema,
    validateReqSchema,
    (req: Request, res: Response) => registerPutController.run(req, res)
  );

  const loginReqSchema = [
    body('email').exists().isEmail(),
    body('password').exists().isString().notEmpty()
  ];

  const loginPostController: LoginPostController = container.get(
    'Apps.Backoffice.Backend.controllers.LoginPostController'
  );
  router.post(
    '/employees/login',
    loginReqSchema,
    validateReqSchema,
    (req: Request, res: Response) => loginPostController.run(req, res)
  );

  const profileGetController: ProfileGetController = container.get(
    'Apps.Backoffice.Backend.controllers.ProfileGetController'
  );
  router.get('/employees/me', protectedRoute, (req: Request, res: Response) =>
    profileGetController.run(req as UserRequest, res)
  );

  const employeesGetController: EmployeesGetController = container.get(
    'Apps.Backoffice.Backend.controllers.EmployeesGetController'
  );
  router.get('/employees', protectedRoute, (req: Request, res: Response) =>
    employeesGetController.run(req as UserRequest, res)
  );

  const changePassReqSchema = [
    body('oldPassword').exists().isString(),
    body('newPassword').exists().isString(),
    body('confirmPassword').exists().isString()
  ];
  const passwordPutController = container.get(
    'Apps.Backoffice.Backend.controllers.PasswordPutController'
  );
  router.put(
    '/employees/:id/password',
    protectedRoute,
    changePassReqSchema,
    validateReqSchema,
    (req: Request, res: Response) => passwordPutController.run(req, res)
  );

  const employeeDeleteController = container.get(
    'Apps.Backoffice.Backend.controllers.EmployeeDeleteController'
  );
  router.delete(
    '/employees/:id',
    protectedRoute,
    (req: Request, res: Response) => employeeDeleteController.run(req, res)
  );
};
