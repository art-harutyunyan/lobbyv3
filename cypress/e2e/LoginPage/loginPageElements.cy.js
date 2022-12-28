
describe('Validating the login page elements', () => {

    beforeEach( () => {

        cy.visit('/');
    });

    it('Username field validations', () => {
        cy.get('.signin__group--username').find('label')
            .should('be.visible')
            .and('have.text', 'Username');
        cy.get('.signin__group--username').find('input').invoke('attr', 'placeholder')
            .should('contain', 'Username');
        cy.get('.signin__input').invoke('attr', 'type')
            .should('equal', 'text');
        cy.get('#signin-username')
            .type('abc')
            .invoke('attr', 'value')
            .should('equal', 'abc')
        cy.get('#signin-username').clear()
            .should('be.empty')
    });

    it('Password field validations', () => {
        
        cy.get('.signin__group--password ').find('label')
            .should('be.visible')
            .and('have.text', 'Password');
        cy.get('#signin-password').invoke('attr', 'placeholder')
            .should('equal', 'Password')
        cy.get('#signin-password').invoke('attr', 'type')
            .should('equal', 'password')
    });

    it('Validates the login page title', () => {
        
        cy.get('h3')
            .should('exist')
            .and('have.text', 'Sign in');
    });

    it('Validate the Forgot Password text', () => {
        
        cy.get('span[class="signin__password-recover"]')
            .should('exist')
            .and('have.text', 'Forgot Password?');
    });

    it('Validate the Login button', () => {
        
        cy.get('button')
            .invoke('attr', 'type')
            .should('equal', 'submit');
        cy.get('button').should('have.text', 'Login');

    });

    it('Validate the SIGN UP section on Login Page', () => {
        
        cy.get('p[class="signin__signup-text"]')
            .find('span').eq(0)
            .should('have.text', 'Don’t have an account?')
            .siblings('span')
            .should('have.text', 'SIGN UP NOW');
    });
});