const { defineConfig } = require('cypress');

module.exports = defineConfig({
   e2e: {
      setupNodeEvents(on, config) {
         // implement node event listeners here
      },
      projectId: 'xoqp6b',
      $schema: 'https://on.cypress.io/cypress.schema.json',
      baseUrl: 'https://pokerlv3.draft10.com',
      defaultCommandTimeout: 6000, // the default one is 4s, we set the defult one to 6s
      experimentalRunAllSpecs: true,

      excludeSpecPattern: ['cypress/e2e/1-getting-started', 'cypress/e2e/2-advanced-examples'],
      viewportWidth: 1025,
      viewportHeight: 875
   }
});
