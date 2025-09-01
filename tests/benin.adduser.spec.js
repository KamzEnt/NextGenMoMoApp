// @ts-check
const { test, expect } = require('@playwright/test');
const { AddContactRequest, AddContactResponse } = require('./helpers/contact-helpers');
const ApiClient = require('./helpers/api-client');

test.describe('Add Contact API Tests', () => {
  let apiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request);
  });

  test('should successfully add a contact with passport', async () => {
    // Create a contact request with default values
    const contactRequest = AddContactRequest.createDefault();
    
    // Send the request
    const response = await apiClient.addContact(contactRequest);

    // Verify the response
    expect(response.ok()).toBeTruthy();
    const responseText = await response.text();
    expect(AddContactResponse.isValid(responseText)).toBeTruthy();
  });

  test('should add a contact with national ID', async () => {
    // Create a contact request with custom values
    const contactRequest = new AddContactRequest(
      'FRI:260764730732/MSISDN',
      'tester2',
      'national_id'
    );
    
    // Send the request
    const response = await apiClient.addContact(contactRequest);

    // Verify the response
    expect(response.ok()).toBeTruthy();
    const responseText = await response.text();
    expect(AddContactResponse.isValid(responseText)).toBeTruthy();
  });
});
