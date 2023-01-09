chai.use(require('chai-sorted'));

describe('Validating the sorting by Blinds column', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
    cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
    cy.wait('@tables');
  });

  it('Validating the sorting by Blinds ASC', () => {
    cy.get('.table-list-item__blinds').find('button').should('contain.text', 'Blinds');
    cy.get('.table-list-item__blinds').find('i[class="fa fa-sort-asc"]').click({ force: true });
    cy.get('div[class="table-list-item__blinds table-list__item-cell"]').then((blinds) => {
      const initialArray = Cypress._.map(blinds, 'innerText');
      const blindsArray = initialArray.map((val) => {
        val = val.slice(0, val.search('/'));
        val = val.replace(/[^0-9\,\r]/g, '');
        val = val.replace(',', '.');
        return val;
      });

      expect(blindsArray.map(Number)).to.be.sorted({ ascending: true });
    });
  });

  it('Validating the sorting by Blinds DESC', () => {
    cy.get('.table-list-item__blinds').find('i[class="fa fa-sort-desc"]').click({ force: true });
    cy.get('div[class="table-list-item__blinds table-list__item-cell"]').then((blinds) => {
      const initialArray = Cypress._.map(blinds, 'innerText');
      const blindsArray = initialArray.map((val) => {
        val = val.slice(0, val.search('/'));
        val = val.replace(/[^0-9\,\r]/g, '');
        val = val.replace(',', '.');
        return val;
      });

      expect(blindsArray.map(Number)).to.be.sorted({ descending: true });
    });
  });
});
