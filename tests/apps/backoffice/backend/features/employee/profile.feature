Feature: Register a new employee
  In order to have employees
  A employee with permissions
  can create a new employee

  Scenario: Unauthorized request
    Given I send a GET request to "/employees/me"
    Then the response status code should be 401

  Scenario: A valid existing employee
    Given A employee registered:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "password": "strong-password"
      }
      """
    And I send an authorized GET request to "/employees/me"
    Then the response status code should be 200
    And the response should be:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "role": "owner"
      }
      """



