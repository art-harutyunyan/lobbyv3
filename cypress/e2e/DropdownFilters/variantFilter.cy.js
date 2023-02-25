describe('Experiment with the API plugin', () => {
   it('cy.api() command', () => {
      cy.api({
         method: 'POST',
         url: 'https://clubapi.pokerplaza.com/api_v2/authenticatePlayer/',
         body: {
            username: 'art',
            password: 'art123',
            skinId: 3133730
         }
      });
   });
});
