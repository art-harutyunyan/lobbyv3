describe('test', () => {
  beforeEach(() => {
    cy.loginViaAPISession('arthur', 'poker123');
    cy.visit('/poker');
  });

  it.skip('test it', function () {
    // cy.visit('/poker');
    cy.log('This is the first test');
  });

  it.skip('test 2', () => {
    cy.log('This is the second test');
    cy.visit('/tournaments');
    cy.contains('tournaments').click();
  });
});
