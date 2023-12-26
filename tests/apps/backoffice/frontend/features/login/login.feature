Feature: Visit Login Page

  Scenario: I visit the Login page
    Given I visit the page 'http://localhost:5173/'
    Then the page should have title "Admin | Login"
    Then the page should contain "button" "Login"

  Scenario: I login
    Given I visit the page 'http://localhost:5173/'
    Then the page should have title "Admin | Login"
    Then fill text input named "email" with text "fftechnology.llc@gmail.com"
    Then fill text input named "password" with text "fandfMaster@"
    Then the page should contain "button" "Login"
    Then click button "Login"
    Then the page should have image with alt text "sidebar_logo"




