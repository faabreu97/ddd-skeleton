
Feature: Retrieve all employees
  In order to retrieve employees
  A employee with permissions
  can get all employees

  Scenario: Unauthorized request
    Given I send a GET request to "/employees"
    Then the response status code should be 401

  Scenario: Should get employees
    Given A employee registered:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    And I send an authorized GET request to "/employees"
    Then the response status code should be 200
    And the response should not include element with id "ef8ac118-8d7f-49cc-abec-78e0d05af80a"

  Scenario: Admins can't get employees
    Given A employee registered:
      """
      {
        "id": "3061b79d-26ce-46fd-bed1-fc36ed322242",
        "name": "Mary Doe",
        "email": "marydoe@example.com",
        "password": "strong-password",
        "role": "admin"
      }
      """
    And I send an authorized GET request to "/employees"
    Then the response status code should be 403

  Scenario: Read only employee can't get employees
    Given A employee registered:
      """
      {
        "id": "3061b79d-26ce-46fd-bed1-fc36ed322242",
        "name": "Mary Doe",
        "email": "marydoe@example.com",
        "password": "strong-password",
        "role": "read"
      }
      """
    And I send an authorized GET request to "/employees"
    Then the response status code should be 403




