Feature: Get all users
  As a user
  I want to see the users

  Scenario: Unauthorized request
    Given I send a GET request to "/users"
    Then the response status code should be 401

  Scenario: With one user
    Given A logged in employee
    And I send an event to the event bus:
      """
      {
        "data": {
          "id": "575a02ca-a288-43b7-a0af-d2d5794b47ae",
          "type": "user.registered",
          "occurred_on": "2023-08-08T08:37:32+00:00",
          "aggregateId": "47c2e205-748f-43be-921b-d16d845069d1",
          "attributes": {
            "name": "Anne Doe",
            "email": "annedoe@example.com"
          },
          "meta": {
            "host": "111.26.06.93"
          }
        }
      }
      """
    When I send an authorized GET request to "/users"
    Then the response status code should be 200
    And the response should be:
      """
      [
        {
          "id": "47c2e205-748f-43be-921b-d16d845069d1",
          "name": "Anne Doe",
          "email": "annedoe@example.com"
        }
      ]
      """

  Scenario: With more than one user having duplicates
    Given A logged in employee
    And I send an event to the event bus:
      """
      {
        "data": {
          "id": "6be4acf1-3e5f-4332-a79b-156755f20e05",
          "type": "user.registered",
          "occurred_on": "2023-08-08T08:37:32+00:00",
          "aggregateId": "8c900b20-e04a-4777-9183-32faab6d2fb5",
          "attributes": {
            "name": "Will Doe",
            "email": "willdoe@example.com"
          },
          "meta": {
            "host": "111.26.06.93"
          }
        }
      }
      """
    And I send an event to the event bus:
      """
      {
        "data": {
          "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
          "type": "user.registered",
          "occurred_on": "2023-08-08T08:37:32+00:00",
          "aggregateId": "47c2e205-748f-43be-921b-d16d845069d1",
          "attributes": {
            "name": "Anne Doe",
            "email": "annedoe@example.com"
          },
          "meta": {
            "host": "111.26.06.93"
          }
        }
      }
      """
    And I send an event to the event bus:
      """
      {
        "data": {
          "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
          "type": "user.registered",
          "occurred_on": "2023-08-08T08:37:32+00:00",
          "aggregateId": "47c2e205-748f-43be-921b-d16d845069d1",
          "attributes": {
            "name": "Anne Doe",
            "email": "annedoe@example.com"
          },
          "meta": {
            "host": "111.26.06.93"
          }
        }
      }
      """
    When I send an authorized GET request to "/users"
    Then the response status code should be 200
    And the response should be:
      """
      [
        {
          "id": "47c2e205-748f-43be-921b-d16d845069d1",
          "name": "Anne Doe",
          "email": "annedoe@example.com"
        },
        {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
          "name": "Will Doe",
          "email": "willdoe@example.com"
        }
      ]
      """



