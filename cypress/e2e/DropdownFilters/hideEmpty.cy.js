describe('Validating the hideEmpty checkbox', () => {
   beforeEach(() => {
      cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
      cy.loginViaAPISession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
      cy.visit('/');
      cy.get('.lobby-header__button--filter').click();
   });

   it('Validate if the checkbox is clickable', () => {
      cy.get('.checkbox__text').eq(1).should('have.text', 'Hide Empty');
      cy.get('.checkbox').find('span').should('have.attr', 'class', 'icon-checkbox');
      cy.get('.icon-checkbox').eq(1).click();
      cy.get('.checkbox').eq(1).find('span').should('have.attr', 'class', 'icon-checkbox-checked');
   });

   it('Validates the empty tables are not shown', () => {
      cy.get('.icon-checkbox').eq(1).click();
      cy.get('div[class="table-list-item__seats table-list__item-cell"]').then((tables) => {
         Cypress._.map(tables, 'innerText').forEach((val) => {
            expect(+val.slice(0, 1)).to.not.equal(0);
         });
      });
   });

   it.only('Validates both checkboxes are selected', () => {
      cy.get('.icon-checkbox').eq(0).click();
      cy.get('.icon-checkbox').click();
      cy.get('div[class="table-list-item__seats table-list__item-cell"]').then((tables) => {
         Cypress._.map(tables, 'innerText').forEach((val) => {
            cy.wrap(+val.slice(0, 1)).should('be.lessThan', +val.slice(2, 3)).and('not.equal', 0);
         });
      });
   });
});
