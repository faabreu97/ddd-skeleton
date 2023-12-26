Feature: Login a user
  In order to login users
  Any user can login

  Scenario: A valid existing user
    Given there is the user:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "strong-password"
      }
      """
    And I send a POST request to "/users/login" with body:
      """
      {
        "email": "johndoe@example.com",
        "password": "strong-password"
      }
      """
    Then the response status code should be 201
    And the response should have property "access_token"

  Scenario: An invalid user
    Given I send a POST request to "/users/login" with body:
      """
      {
        "email": "johndoe1234@example.com",
        "password": "strong-password"
      }
      """
    Then the response status code should be 404


