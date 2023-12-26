Feature: Register a new employee
  In order to have employees
  A employee with permissions
  can create a new employee

  Scenario: A valid existing employee
    Given there is the employee:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password"
      }
      """
    And I send a POST request to "/employees/login" with body:
      """
      {
        "email": "johndoe@example.com",
        "password": "strong-password"
      }
      """
    Then the response status code should be 201
    And the response should have property "access_token"

  Scenario: An invalid employee
    Given I send a POST request to "/employees/login" with body:
      """
      {
        "email": "johndoe1234@example.com",
        "password": "strong-password"
      }
      """
    Then the response status code should be 404


