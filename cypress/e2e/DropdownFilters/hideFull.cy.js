describe('Validating the hideFull checkbox', () => {
   beforeEach(() => {
      cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
      cy.loginViaAPISession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
      cy.visit('/');
      cy.get('.lobby-header__button--filter').click();
   });

   it.skip('Validate if the checkbox is clickable', () => {
      cy.get('.checkbox__text').eq(0).should('have.text', 'Hide Full');
      cy.get('.checkbox').find('span').should('have.attr', 'class', 'icon-checkbox');
      cy.get('.icon-checkbox').eq(0).click();
      cy.get('.checkbox').find('span').should('have.attr', 'class', 'icon-checkbox-checked');
   });

   it('Validate if the full tables are not shown', () => {
      cy.get('.icon-checkbox').eq(0).click();
      cy.get('div[class="table-list-item__seats table-list__item-cell"]').then((tables) => {
         Cypress._.map(tables, 'innerText').forEach((val) => {
            expect(+val.slice(0, 1)).to.be.lessThan(+val.slice(2, 3));
         });
      });
   });
});
