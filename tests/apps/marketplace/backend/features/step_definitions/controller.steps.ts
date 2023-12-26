import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';

import { User } from '../../../../../../src/Contexts/Marketplace/User/domain/User';
import { UserId } from '../../../../../../src/Contexts/Marketplace/User/domain/UserId';
import { UserName } from '../../../../../../src/Contexts/Marketplace/User/domain/UserName';
import { UserRepository } from '../../../../../../src/Contexts/Marketplace/User/domain/UserRepository';
import { EmailAddress } from '../../../../../../src/Contexts/Shared/domain/value-object/EmailAddress';
import { Password } from '../../../../../../src/Contexts/Shared/domain/value-object/Password';
import container from '../../../../../../src/apps/marketplace/backend/dependency-injection';
import { RegisterUserCommandMother } from '../../../../../Contexts/Marketplace/User/application/Register/RegisterUserCommandMother';
import { application } from './hooks.steps';

let _request: request.Test;
let _response: request.Response;
let _accessToken: string;

const basePath = '/api';

Given('A logged in user', async () => {
  const userRepository: UserRepository = container.get(
    'Marketplace.User.domain.UserRepository'
  );
  const command = RegisterUserCommandMother.random();
  const { id, name, email, password } = command;
  const userPass = await Password.create(password);
  await userRepository.save(
    new User(
      new UserId(id),
      new UserName(name),
      new EmailAddress(email),
      userPass
    )
  );
  const response = await request(application.httpServer)
    .post(`${basePath}/users/login`)
    .send({
      email: command.email,
      password: command.password
    });
  assert('access_token' in response.body);
  _accessToken = response.body.access_token;
});

Given('A user registered:', async (value: any) => {
  const userRepository: UserRepository = container.get(
    'Marketplace.User.domain.UserRepository'
  );
  const command = JSON.parse(value);
  const { id, name, email, password } = command;
  const userPass = await Password.create(password);
  await userRepository.save(
    new User(
      new UserId(id),
      new UserName(name),
      new EmailAddress(email),
      userPass
    )
  );
  const response = await request(application.httpServer)
    .post(`${basePath}/users/login`)
    .send({
      email: command.email,
      password: command.password
    });
  assert('access_token' in response.body);
  _accessToken = response.body.access_token;
});

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(basePath + route);
});

Given('I send an authorized GET request to {string}', (route: string) => {
  _request = request(application.httpServer)
    .get(basePath + route)
    .set('Authorization', 'Bearer ' + _accessToken);
});

Given('I send a DELETE request to {string}', (route: string) => {
  _request = request(application.httpServer).delete(basePath + route);
});

Given('I send an authorized DELETE request to {string}', (route: string) => {
  _request = request(application.httpServer)
    .delete(basePath + route)
    .set('Authorization', 'Bearer ' + _accessToken);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async response => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  assert.deepStrictEqual(_response.body, expectedResponse);
});

Then('show me the response body', () => {
  console.log('_response.body', _response.body);
});

Then('the response should have property {string}', async (property: string) => {
  _response = await _request;
  assert(property in _response.body);
});

Given(
  'I send a PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.httpServer)
      .put(basePath + route)
      .send(JSON.parse(body));
  }
);

Given(
  'I send an authorized PUT request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.httpServer)
      .put(basePath + route)
      .set('Authorization', 'Bearer ' + _accessToken)
      .send(JSON.parse(body));
  }
);

Given(
  'I send a POST request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.httpServer)
      .post(basePath + route)
      .send(JSON.parse(body));
  }
);

Given(
  'I send an authorized POST request to {string} with body:',
  (route: string, body: string) => {
    _request = request(application.httpServer)
      .post(route)
      .set('Authorization', 'Bearer ' + _accessToken)
      .send(JSON.parse(body));
  }
);

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then(
  'the response should not include element with id {string}',
  (id: string) => {
    const userExistInResponse = _response.body.some(
      (item: any) => item.id === id
    );
    assert.deepStrictEqual(userExistInResponse, false);
  }
);
