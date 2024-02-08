Feature: Change a employee password
  In order to change password
  A employee with permissions
  can change his password

  Scenario: Unauthorized request
    Given I send a PUT request to "/employees/ef8ac118-8d7f-49cc-abec-78e0d05af80a/password" with body:
      """
      {
        "oldPassword": "strong-password",
        "newPassword": "another-password",
        "confirmPassword": "another-password"
      }
      """
    Then the response status code should be 401

  Scenario: A valid non existing employee
    Given A employee registered:
      """
      {
        "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "name": "Cris Doe",
        "email": "crisdoe@example.com",
        "password": "strong-password",
        "role": "owner"
      }
      """
    And I send an authorized PUT request to "/employees/ef8ac118-8d7f-49cc-abec-78e0d05af80a/password" with body:
      """
      {
        "oldPassword": "strong-password",
        "newPassword": "another-password",
        "confirmPassword": "another-password"
      }
      """
    Then the response status code should be 200



