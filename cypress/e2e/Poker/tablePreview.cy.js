import emptyTables from '../../fixtures/tableRelatedData/emptyTables.json';

describe('Validating the table prives section', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/tables*', { fixture: './tableRelatedData/emptyTables.json' }).as('tables');
    cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
    cy.wait('@tables');
  });

  it('Validate the table preview texts to match the tableList params', () => {
    cy.get('.table-list__item').should('have.length', emptyTables.tables.length);
    cy.get('.table-list__item').each((tableItem) => {
      cy.wrap(tableItem)
        .click()
        .then(() => {
          // validating the table name in tableList vs tablePreview
          cy.wrap(tableItem).find('span').eq(0).should('have.text', Cypress.$('.table-inner-info--name').text());
          // validating the gameType in tableList vs tablePreview
          cy.wrap(tableItem)
            .find('span')
            .eq(1)
            .should('have.text', Cypress.$('span[class="poker-mini-table__game-type-text"]').text());
          // validating the players in tableList vs tablePreview
          cy.get('.table-info-players').find('div').eq(0).should('have.text', 'Players');
          cy.wrap(tableItem)
            .find('span')
            .eq(2)
            .should('have.text', Cypress.$('.table-info-players').find('div').eq(1).text())
            .then((a) => {
              let emptySeatsCount = a.text().split('/');
              cy.get('.poker-seat').should('have.length', emptySeatsCount[1] - emptySeatsCount[0]);
            });
          // validating the blinds in tableList vs tablePreview
          cy.get('.table-inner-info--blinds').find('span').eq(0).should('have.text', 'Blinds');
          cy.wrap(tableItem)
            .find('span')
            .eq(3)
            .should('have.text', Cypress.$('.table-inner-info--blinds').find('span').eq(1).text());
          // validating the buyins in tableList vs tablePreview
          cy.get('.table-info-buyin').find('div').eq(0).should('have.text', 'Buyin');
          cy.wrap(tableItem)
            .find('span')
            .eq(4)
            .should('have.text', Cypress.$('.table-info-buyin').find('div').eq(1).text());
        });
    });
  });
});
