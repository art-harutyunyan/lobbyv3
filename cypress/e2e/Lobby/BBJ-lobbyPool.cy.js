describe('Bad Beat Jackpot pool tests', () => {
   beforeEach(() => {
      cy.visit('/');
      // cy.loginWithSession(
      //     Cypress.env('userAccounts').username,
      //     Cypress.env('userAccounts').password,
      // );
      cy.login(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
   });

   it('expera', () => {
      let pool;
      cy.request({
         method: 'GET',
         url: `${Cypress.env('apis').jackpot}token=${JSON.parse(window.localStorage['account-data']).token}`
      }).then((resp) => {
         resp.body.jackpots.forEach((element) => {
            if (element.name === 'Bad beat jackpot') {
               pool = element.pool;
            }
         });
         cy.generatePoolFromOdometer().then((value) => {
            expect(pool.toString().match(/[0-9]/g).join('')).to.equal(value);
         });
      });
   });
});
