chai.use(require('chai-sorted'));

describe('Validating the sorting by the Seat column', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
    cy.loginWithSession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.visit('/');
    cy.wait('@tables');
  });

  it('Validating sorting by Seat column ASC', () => {
    cy.visit('/');
    const seatsArray = [];

    cy.get('.table-list-item__seats').find('button').should('contain.text', 'Seats');
    cy.get('.table-list-item__seats').find('i[class="fa fa-sort-asc"]').click({ force: true });

    cy.get('div[class="table-list-item__seats table-list__item-cell"]').then((seats) => {
      // adding seats elements text to "p" array as strings
      let p = Cypress._.map(seats, 'innerText');

      // modifying such "2/9" string to be just 2, as the first number is interesting
      for (let index = 0; index < p.length; index++) {
        seatsArray.push(p[index].slice(0, 1));
      }

      // by .map(Number) we are changing the type from string -> number
      expect(seatsArray.map(Number)).to.be.sorted({ ascending: true });
    });
  });

  it('Validating sorting by Seat column DESC', () => {
    cy.visit('/');
    const seatsArray = [];

    cy.get('.table-list-item__seats').find('i[class="fa fa-sort-desc"]').click({ force: true });

    cy.get('div[class="table-list-item__seats table-list__item-cell"]').then((seats) => {
      // adding seats elements text to "p" array as strings
      let p = Cypress._.map(seats, 'innerText');

      // modifying such "2/9" string to be just 2, as the first number is interesting
      for (let index = 0; index < p.length; index++) {
        seatsArray.push(p[index].slice(0, 1));
      }

      // by .map(Number) we are changing the type from string -> number
      expect(seatsArray.map(Number)).to.be.sorted({ descending: true });
    });
  });
});
