Feature: Register a new user
  In order to have users
  Everybody can create a new user

  Scenario: A valid non existing user
    Given I send a PUT request to "/users/register/86cbe066-9c9d-4dc7-8097-8f6f3aec2e1e" with body:
      """
      {
        "id": "86cbe066-9c9d-4dc7-8097-8f6f3aec2e1e",
        "name": "Eve Doe",
        "email": "evedoe@example.com",
        "password": "strong-password"
      }
      """
    Then show me the response body
    Then the response status code should be 201
    And the response should have property "access_token"

  Scenario: Should not exist a user with the id provided
    Given there is the user:
      """
      {
        "id": "9ff227cc-5c42-495a-b66f-6cce0e321afb",
        "name": "Steve Doe",
        "email": "stevedoe@example.com",
        "password": "strong-password"
      }
      """
    And I send a PUT request to "/users/register/9ff227cc-5c42-495a-b66f-6cce0e321afb" with body:
      """
      {
        "id": "9ff227cc-5c42-495a-b66f-6cce0e321afb",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password"
      }
      """
    Then the response status code should be 403

  Scenario: Email should be unique
    Given there is the user:
      """
      {
        "id": "9ff227cc-5c42-495a-b66f-6cce0e321afb",
        "name": "Steve Doe",
        "email": "stevedoe@example.com",
        "password": "strong-password"
      }
      """
    And I send a PUT request to "/users/register/b66daed2-239c-486b-acff-fd98cde2c689" with body:
      """
      {
        "id": "b66daed2-239c-486b-acff-fd98cde2c689",
        "name": "John Doe",
        "email": "stevedoe@example.com",
        "password": "strong-password"
      }
      """
    Then the response status code should be 400


