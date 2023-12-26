Feature: Register a new employee
  In order to have employees
  A employee with permissions
  can create a new employee

  Scenario: Unauthorized request
    Given I send a PUT request to "/employees/register/52fd77ec-d2c2-49aa-97a2-545faa0011c2" with body:
      """
      {
        "id": "52fd77ec-d2c2-49aa-97a2-545faa0011c2",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 401

  Scenario: A valid non existing employee
    Given A employee registered:
      """
      {
        "id": "b88c4837-6229-4203-9e3c-d8f744a933f8",
        "name": "Will Doe",
        "email": "willdoe2@example.com",
        "password": "strong-password"
      }
      """
    And I send an authorized PUT request to "/employees/register/52fd77ec-d2c2-49aa-97a2-545faa0011c2" with body:
      """
      {
        "id": "52fd77ec-d2c2-49aa-97a2-545faa0011c2",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password",
        "role": "admin"
      }
      """
    Then the response status code should be 201
    And the response should be empty

  Scenario: Role should be owner
    Given A employee registered:
      """
      {
        "id": "b88c4837-6229-4203-9e3c-d8f744a933f8",
        "name": "Will Doe",
        "email": "willdoe2@example.com",
        "password": "strong-password",
        "role": "read"
      }
      """
    And I send an authorized PUT request to "/employees/register/52fd77ec-d2c2-49aa-97a2-545faa0011c2" with body:
      """
      {
        "id": "52fd77ec-d2c2-49aa-97a2-545faa0011c2",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 403

  Scenario: Should not exist a employee with the id provided
    Given A employee registered:
      """
      {
        "id": "9ff227cc-5c42-495a-b66f-6cce0e321afb",
        "name": "Steve Doe",
        "email": "stevedoe@example.com",
        "password": "strong-password"
      }
      """
    And I send an authorized PUT request to "/employees/register/9ff227cc-5c42-495a-b66f-6cce0e321afb" with body:
      """
      {
        "id": "9ff227cc-5c42-495a-b66f-6cce0e321afb",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 403

  Scenario: Email should be unique
    Given I send an authorized PUT request to "/employees/register/b66daed2-239c-486b-acff-fd98cde2c689" with body:
      """
      {
        "id": "b66daed2-239c-486b-acff-fd98cde2c689",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 400


