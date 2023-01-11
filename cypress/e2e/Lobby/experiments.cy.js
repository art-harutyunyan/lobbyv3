describe('test', () => {
  beforeEach(() => {
    cy.visit('/');
    const a = 10;
    cy.wrap(a).as('single');
  });

  it('test it', function () {
    cy.log(this.single);
  });
});
