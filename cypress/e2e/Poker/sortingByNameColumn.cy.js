chai.use(require('chai-sorted'));

describe('Validate the table list sorting', () => {
  beforeEach(() => {
    // cy.visit('/');
    cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
    cy.loginViaAPISession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);

    // cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
    cy.wait('@tables');
  });

  it('Validates the sorting by the "Name" column ASC', () => {
    // cy.visit('/');

    // validating the name of the column
    cy.get('.table-list-item__name').find('button').should('contain.text', 'Name');
    // clicking to name sorter by ASC
    cy.get('.table-list-item__name').find('i[class="fa fa-sort-asc"]').click({ force: true });

    cy.get('div[class="table-list-item__name table-list__item-cell"]').then((name) => {
      // adding all existing ".table-name" texts into a 'tableNames' array
      cy.log('Creating a new array with table names');
      let tableNames = Cypress._.map(name, 'innerText');
      expect(tableNames).to.be.sorted({ ascending: true });
    });
  });

  it('Validates the sorting by the "Name" column DESC', () => {
    // cy.visit('/');
    // clicking to name sorter by DESC
    cy.get('.table-list-item__name').find('i[class="fa fa-sort-desc"]').click({ force: true });

    cy.get('div[class="table-list-item__name table-list__item-cell"]').then((name) => {
      // adding all existing ".table-name" texts into a 'tableNames' array
      cy.log('Creating a new array with table names');
      let tableNames = Cypress._.map(name, 'innerText');
      expect(tableNames).to.be.sorted({ descending: true });
    });
  });
});
