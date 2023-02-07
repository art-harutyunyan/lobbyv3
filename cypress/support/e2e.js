// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-map';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import storageData from '../fixtures/storage/localStorageData.json';

Cypress.Commands.add('login', function (username, password) {
  cy.intercept('POST', Cypress.env('apis').authenticate).as('login');
  cy.get('#signin-username').type(username);
  cy.get('#signin-password').type(password);
  cy.contains('Login').click();
  cy.wait('@login')
    .its('response')
    .then((newdata) => {
      return cy.wrap(newdata.body);
    });
});

Cypress.Commands.add('loginViaAPI', (username, password) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apis').authenticate,
    body: {
      username: username,
      password: password,
      skinId: 500005
    }
  }).then((response) => {
    storageData.token = response.body.result.token;
    window.localStorage.setItem('account-data', JSON.stringify(storageData));
    return cy.wrap(response.body);
  });
});

Cypress.Commands.add('loginViaAPISession', (username, password) => {
  cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('apis').authenticate,
      body: {
        username: username,
        password: password,
        skinId: 500005
      }
    }).then((response) => {
      storageData.token = response.body.result.token;
      window.localStorage.setItem('account-data', JSON.stringify(storageData));
      return cy.wrap(response.body);
    });
  });
});

Cypress.Commands.add('loginWithSession', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/');
    // cy.intercept('POST', Cypress.env('apis').authenticate).as('login');
    cy.get('#signin-username').type(username);
    cy.get('#signin-password').type(password);
    cy.contains('Login').click();
    cy.location('pathname').should('equal', '/poker');
    // cy.wait('@login').its('statusCode').should('eq', 200);
  });
});

Cypress.Commands.add('generatePoolFromOdometer', () => {
  const arr = [];
  cy.get('.odometer-digit-spacer')
    .eq(0)
    .then((space) => {
      let lenght = parseInt(space.text());
      for (let i = 0; i < parseInt(lenght); i++) {
        arr.push(Cypress.$('.odometer-value').eq(i).text());
      }
      return cy.wrap(arr.join(''));
    });
});
