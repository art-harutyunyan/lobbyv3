describe('Validating the navigations between the gameTypes', () => {
   beforeEach(() => {
      cy.visit('/');
      cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
      // cy.login(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
   });

   it('Validate the default selection', () => {
      cy.visit('/');
      cy.location('pathname').should('equal', '/poker');
   });

   it('Validate the tournament page navigation', () => {
      cy.visit('/');
      cy.get('[data-category="tournaments"]').click();
      cy.location('pathname').should('equal', '/tournaments');
   });

   it('Validate the SnG page navigation', () => {
      cy.visit('/');
      cy.get('[data-category="sitAndGo"]').click();
      cy.location('pathname').should('equal', '/sitAndGo');
   });
});
