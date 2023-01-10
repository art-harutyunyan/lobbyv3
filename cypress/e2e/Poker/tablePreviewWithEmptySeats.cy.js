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
    cy.get('.table-list-item__name').find('i[class="fa fa-sort-desc"]').click();
    cy.get('.table-list__item').should('have.length', emptyTables.tables.length);
    cy.get('.table-list__item').each((tableItem, i) => {
      cy.wrap(tableItem)
        .click()
        .then(() => {
          // validating the table name in tableList vs tablePreview
          cy.wrap(tableItem)
            .find('span')
            .eq(0)
            .should('have.text', Cypress.$('.table-inner-info--name').text())
            .and('have.text', emptyTables.tables[i].name);
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
              let seatsCount = a.text().split('/');
              expect(parseInt(seatsCount[1])).to.be.equal(emptyTables.tables[i].seatCount);
              cy.get('.poker-seat').should('have.length', seatsCount[1] - seatsCount[0]);
            });
          // validating the blinds in tableList vs tablePreview
          cy.get('.table-inner-info--blinds').find('span').eq(0).should('have.text', 'Blinds');
          cy.wrap(tableItem)
            .find('span')
            .eq(3)
            .then((blinds) => {
              expect(blinds.text()).to.equal(Cypress.$('.table-inner-info--blinds').find('span').eq(1).text());
              const arr = blinds.text().split('/');
              let sb = arr[0].replace(/[^0-9\,\r]/g, '');
              let bb = arr[1].replace(/[^0-9\,\r]/g, '');
              expect(+sb).to.equal(emptyTables.tables[i].sb);
              expect(+bb).to.equal(emptyTables.tables[i].bb);
            });
          // validating the buyins in tableList vs tablePreview
          cy.get('.table-info-buyin').find('div').eq(0).should('have.text', 'Buyin');
          cy.wrap(tableItem)
            .find('span')
            .eq(4)
            .then((buyin) => {
              expect(buyin.text()).to.equal(Cypress.$('.table-info-buyin').find('div').eq(1).text());
              expect(+buyin.text().replace(/[^0-9\,\r]/g, '')).to.equal(emptyTables.tables[i].minBuyIn);
            });
          cy.get('div[class="btn call-to-action call-to-action--link"]')
            .contains('open')
            .should('be.visible')
            .find('img')
            .invoke('attr', 'src')
            .should('include', '/static/media/eye-icon.3eff0d18.svg');
        });
    });
  });
});
