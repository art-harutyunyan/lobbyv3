chai.use(require('chai-sorted'));

describe('Validating the sorting by the BUYIN column', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
    cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
    cy.wait('@tables');
  });

  it('Validating the sorting by ASC', () => {
    cy.get('.table-list-item__buyIn').find('button').should('contain.text', 'Buy in');
    cy.get('.table-list-item__buyIn').find('i[class="fa fa-sort-asc"]').click({ force: true });

    cy.get('div[class="table-list-item__buyIn table-list__item-cell"]').then((buyin) => {
      // adding all buyin amounts to an array as strings
      const a = Cypress._.map(buyin, 'innerText');

      // editing the strings to have "$500" to "500" and adding to a new array
      let buyinArray = a.map((val) => {
        val = val.replace(/[^0-9]/g, '');
        return val;
      });
      expect(buyinArray.map(Number)).to.be.sorted({ ascending: true });
    });
  });

  it('Validating the sorting by DESC', () => {
    cy.get('.table-list-item__buyIn').find('i[class="fa fa-sort-desc"]').click({ force: true });

    cy.get('div[class="table-list-item__buyIn table-list__item-cell"]').then((buyin) => {
      // adding all buyin amounts to an array as strings
      const a = Cypress._.map(buyin, 'innerText');

      // editing the strings to have "$500" to "500" and adding to a new array
      let buyinArray = a.map((val) => {
        val = val.replace(/[^0-9]/g, '');
        return val;
      });
      expect(buyinArray.map(Number)).to.be.sorted({ descending: true });
    });
  });
});
