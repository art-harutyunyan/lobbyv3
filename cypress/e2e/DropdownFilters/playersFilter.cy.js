describe('Validate the Players dropdown filter', () => {
   beforeEach(() => {
      cy.intercept('GET', '**/tables*', { fixture: 'tableRelatedData/tablesWithPlayers.json' }).as('tables');
      cy.loginViaAPISession(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
      cy.visit('/');
      cy.get('.lobby-header__button--filter').click();
   });

   it('General validation of the filters labels', () => {
      cy.get('.lobby-header__right')
         .find('div[class]')
         .eq(1)
         .then((val) => {
            expect(val[0].className).to.contain('--selected');
         });
      const labels = ['Players', 'Variant', 'Limit', 'Buy in'];
      cy.get('li[class="poker__filter"]').find('.poker__filter-label').map('innerText').should('deep.equal', labels);
   });

   it('Validate the filter "Players"', () => {
      const options = ['All', 'Heads Up', '4-6', 'Full'];
      // validating the Players filter
      cy.get('.poker__filter').eq(0).click();
      cy.get('.dropdown__option').map('innerText').should('deep.equal', options);
      cy.contains('Heads Up').click();
      cy.get('div[class="table-list-item__seats table-list__item-cell"]')
         .map('innerText')
         .mapInvoke('slice', 2, 3)
         .should('not.contain', '2');
      cy.contains('Omaha').click({ force: true });
      cy.get('div[class="table-list-item__seats table-list__item-cell"]')
         .map('innerText')
         .mapInvoke('slice', 2, 3)
         .tap('')
         .should('not.contain', '2');
   });
});
