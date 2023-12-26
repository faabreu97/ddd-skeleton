Feature: Delete a employee
  In order to delete employees
  A owner employee
  can delete a employee

  Scenario: Unauthorized request
    Given I send a DELETE request to "/employees/52fd77ec-d2c2-49aa-97a2-545faa0011c2"
    Then the response status code should be 401

  Scenario: Delete an existing employee
    Given A employee registered:
      """
      {
        "id": "fa46c9c7-c6e2-4d18-9d4d-ed02f3b22459",
        "name": "Joseph Doe",
        "email": "josephdoe@example.com",
        "password": "strong-password"
      }
      """
    And there is the employee:
      """
      {
        "id": "885038c5-8efb-4ad6-b413-c1a4684bff8a",
        "name": "Elon Doe",
        "email": "elondoe@example.com",
        "password": "strong-password"
      }
      """
    And I send an authorized DELETE request to "/employees/885038c5-8efb-4ad6-b413-c1a4684bff8a"
    Then the response status code should be 200
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
    And there is the employee:
      """
      {
        "id": "8591cce7-af08-4037-b699-0ab55f381e35",
        "name": "Bill Doe",
        "email": "billdoe@example.com",
        "password": "strong-password"
      }
      """
    And I send an authorized DELETE request to "/employees/8591cce7-af08-4037-b699-0ab55f381e35"
    Then the response status code should be 403