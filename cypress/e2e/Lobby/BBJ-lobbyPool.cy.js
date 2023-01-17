describe('Bad Beat Jackpot pool tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.loginViaApi(Cypress.env('userAccounts').username, Cypress.env('userAccounts').password);
    cy.window().then((win) => {
      const storage = JSON.parse(win.localStorage.getItem('account-data')).token;
      cy.wrap(storage).as('token');
    });
  });

  it('Bad Beat Jackpot Pool validation', function () {
    let pool;

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apis').jackpot}token=${this.token}`
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
