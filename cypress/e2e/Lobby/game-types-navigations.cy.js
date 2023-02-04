describe('Validating the navigations between the gameTypes', () => {
  beforeEach(() => {
    cy.loginViaAPISession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    // cy.login(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
  });

  it('Validate the default selection', () => {
    cy.location('pathname').should('equal', '/poker');
  });

  it('Validate the tournament page navigation', () => {
    cy.get('[data-category="tournaments"]').click();
    cy.location('pathname').should('equal', '/tournaments');
  });

  it('Validate the SnG page navigation', () => {
    cy.get('[data-category="sitAndGo"]').click();
    cy.location('pathname').should('equal', '/sitAndGo');
  });
});
