describe('Validate the filter with game types', () => {
  beforeEach(() => {
    cy.loginViaAPISession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
    // cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
  });

  it('Validate HOLDEM game Type', () => {
    // cy.visit('/');
    cy.get('div[class="table-list-item__gameType table-list__item-cell table-type--1"]').each(($gameType) => {
      cy.wrap($gameType.text()).should('equal', 'Holdem');
    });
  });

  it('Validate Omaha game type', () => {
    // cy.visit('/');
    cy.contains('.game-type ', 'Omaha').click();
    cy.get('div[class="table-list-item__gameType table-list__item-cell table-type--2"]').each(($gameType) => {
      cy.wrap($gameType.text()).should('contain', 'Omaha');
    });
  });

  it('Validate TurkihPoker game type', () => {
    // cy.visit('/');
    cy.contains('.game-type ', 'Turkish poker').click();
    cy.get('div[class="table-list-item__gameType table-list__item-cell table-type--14"]').each(($gameType) => {
      cy.wrap($gameType.text()).should('equal', 'Turkish poker');
    });
  });

  //TODO add this test when the gameType is fixed for DOM element
  it.skip('Validate the Stud game type', () => {
    cy.visit('/');
    cy.contains('.game-type ', '5 stud').click();
  });
});
