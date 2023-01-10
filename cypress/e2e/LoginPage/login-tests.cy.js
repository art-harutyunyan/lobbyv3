describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('Logs in with correct credentials', () => {
    // intercepting the authenticate request on login
    cy.intercept('POST', Cypress.env('apis').authenticate).as('login');
    cy.get('#signin-username').type(Cypress.env('userAccounts').username);
    cy.get('#signin-password').type(Cypress.env('userAccounts').password);
    cy.contains('Login').click();
    cy.wait('@login')
      .its('response')
      .then((data) => {
        expect(data.statusCode).to.equal(200);
        expect(data.body.success).to.be.true;
        // validating the logo and the pathname
        cy.get('.logo').should('be.visible');
        cy.location('pathname').should('contain', 'poker');
        // validating the avatar
        cy.get('.avatar')
          .find('div')
          .should('have.css', 'background-image', `url("${data.body.result.personalInfo.avatar.imagePath}")`);
        // validating the nickname on the top
        cy.get('.user__name').should('have.text', data.body.result.nickname);
        // make sure the balance in API response and client are the same
        cy.get('.user__wallet')
          .invoke('text')
          .then((text) => {
            let balance;
            data.body.result.wallets.forEach((element) => {
              if (element.currency === 'TRY') {
                balance = element.balance;
              }
            });
            expect(text).to.equal(balance.toString());
          });
      });
  });

  it('Logs in with an incorrect credentials', () => {
    // intercepting the API response on login
    cy.intercept('POST', Cypress.env('apis').authenticate).as('login');
    cy.get('#signin-username').type(Cypress.env('userAccounts').incorrectUser);
    cy.get('#signin-password').type(Cypress.env('userAccounts').incorrectPassword);
    cy.contains('Login').click();
    cy.wait('@login')
      .its('response')
      .then((data) => {
        // validating the negative tests on API level
        expect(data.statusCode).to.equal(403);
        expect(data.body.success).to.be.false;
        expect(data.body.message.key).to.equal('document_not_found');
        expect(data.body.message.params).to.have.length(2);
        expect(data.body.message.params[1].username).to.equal(Cypress.env('userAccounts').incorrectUser);
        expect(data.body.message.params[1].typeId).to.equal(1);
      });
  });

  it('Logs in with incorrect password', () => {
    cy.intercept('POST', Cypress.env('apis').authenticate).as('login');
    cy.get('#signin-username').type(Cypress.env('userAccounts').username);
    cy.get('#signin-password').type(Cypress.env('userAccounts').incorrectPassword);
    cy.contains('Login').click();
    cy.wait('@login')
      .its('response')
      .then((data) => {
        expect(data.statusCode).to.equal(400);
        expect(data.body.success).to.be.false;
        expect(data.body.message.key).to.equal('incorrect_password');
      });
  });

  it('Checks the blank login', () => {
    cy.contains('Login').click();
    // on login button click 'required' text should appear on both the fields
    cy.get('.signin__error').should('have.length', 2);
    cy.get('.signin__error').eq(0).should('have.text', 'Required');
  });
});
