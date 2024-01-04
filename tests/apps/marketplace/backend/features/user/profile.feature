Feature: Register a new user
  In order to have users
  A user with permissions
  can create a new user

  Scenario: Unauthorized request
    Given I send a GET request to "/users/me"
    Then the response status code should be 401

  Scenario: A valid existing user
    Given A user registered:
      """
      {
        "id": "aae54651-cabb-4051-9c40-4a59aed340a6",
        "name": "Tom Doe",
        "email": "tomdoe@example.com",
        "password": "strong-password"
      }
      """
    And I send an authorized GET request to "/users/me"
    Then the response status code should be 200
    And the response should be:
      """
      {
        "id": "aae54651-cabb-4051-9c40-4a59aed340a6",
        "name": "Tom Doe",
        "email": "tomdoe@example.com"
      }
      """



