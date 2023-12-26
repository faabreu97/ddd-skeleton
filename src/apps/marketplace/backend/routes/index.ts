import { Request, Response, Router } from 'express';
import { validationResult } from 'express-validator';
import * as glob from 'glob';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { EmployeeId } from '../../../../Contexts/Backoffice/Employee/domain/EmployeeId';
import { EmployeeRepository } from '../../../../Contexts/Backoffice/Employee/domain/EmployeeRepository';
import { EmployeeRoles } from '../../../../Contexts/Backoffice/Employee/domain/EmployeeRole';
import backofficeConfig from '../../../../Contexts/Backoffice/Shared/infrastructure/config';
import container from '../dependency-injection';

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.map(route => register(route, router));
}

function register(routePath: string, app: Router) {
  const route = require(routePath);
  route.register(app);
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors: any = {};

  validationErrors.array().forEach(error => {
    errors[error.param] =
      (errors[error.param] ? errors[error.param] + ', ' : '') + error.msg;
  });

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  });
}

export type UserRequest = Request & { user: { id: string } };

export function protectedRoute(req: any, res: Response, next: Function) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    backofficeConfig.get('secret.jwt'),
    (err: any, user: any) => {
      if (err) return res.sendStatus(401);

      req.user = user;

      next();
    }
  );
}

export function allowedRoles(...roles: EmployeeRoles[]) {
  return async (req: any, res: Response, next: Function) => {
    const id = req.user.id;
    const userRepository: EmployeeRepository = container.get(
      'Backoffice.Employee.domain.EmployeeRepository'
    );
    const user = await userRepository.search(new EmployeeId(id));

    if (!user) return res.sendStatus(401);

    const haveAllowedRole = roles.includes(user.role.value as EmployeeRoles);

    if (!haveAllowedRole) return res.sendStatus(403);

    next();
  };
}
