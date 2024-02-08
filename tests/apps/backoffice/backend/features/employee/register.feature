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
        "password": "strong-password",
        "role": "owner"
      }
      """
    And I send an authorized PUT request to "/employees/register/54db0af7-1f3a-4ec2-9148-ad4429d8b018" with body:
      """
      {
        "id": "54db0af7-1f3a-4ec2-9148-ad4429d8b018",
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
        "name": "Thor Doe",
        "email": "thordoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 403

  Scenario: Should not exist a employee with the id provided
    Given A employee registered:
      """
      {
        "id": "f1208ef6-2560-45bf-ac19-675cc3595143",
        "name": "Steve Doe",
        "email": "stevedoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    And I send an authorized PUT request to "/employees/register/f1208ef6-2560-45bf-ac19-675cc3595143" with body:
      """
      {
        "id": "f1208ef6-2560-45bf-ac19-675cc3595143",
        "name": "Tony Doe",
        "email": "tonydoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 400

  Scenario: Email should be unique
    Given A employee registered:
      """
      {
        "id": "f3904946-6f1d-4253-b267-95039caa54b3",
        "name": "Hulk Doe",
        "email": "hulkdoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    And I send an authorized PUT request to "/employees/register/b66daed2-239c-486b-acff-fd98cde2c689" with body:
      """
      {
        "id": "b66daed2-239c-486b-acff-fd98cde2c689",
        "name": "John Doe",
        "email": "hulkdoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    Then the response status code should be 400


