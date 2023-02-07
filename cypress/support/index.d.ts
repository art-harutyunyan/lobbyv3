declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Use this command to login to application from the UI
     * @example
     * cy.login('user', 'pass')
     */
    login(username: string, password: string): Chainable<any>;

    /**
     * Use this command to login to application from the UI
     * @example
     * cy.login('user', 'pass')
     */
    loginViaAPI(username: string, password: string): Chainable<any>;

    /**
     * Keeping the session for all the test-cases in the
     * describe block
     * @example
     * cy.loginWithSession('user', 'pass')
     */
    loginWithSession(username: string, password: string): Chainable<any>;

    /**
     * Generating the pool from the odometer
     * describe block
     * @example
     * cy.generatePoolFromOdometer()
     */
    generatePoolFromOdometer(): Chainable<any>;

    /**
     * Keeping the session for all the test-cases in the
     * describe block
     * @example
     * cy.loginViaAPISession('user', 'pass')
     */
    loginViaAPISession(username: string, password: string): Chainable<any>;
  }
}
