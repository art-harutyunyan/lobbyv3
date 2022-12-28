const { defineConfig } = require('cypress');

module.exports = defineConfig({
   e2e: {
      setupNodeEvents(on, config) {
         // implement node event listeners here
      },
      $schema: 'https://on.cypress.io/cypress.schema.json',
      baseUrl: 'https://pokerlv3.draft10.com',
      defaultCommandTimeout: 6000, // the default one is 4s, we set the defult one to 5s
      experimentalRunAllSpecs: true,
      retries: {
         openMode: 2,
         runMode: 0
      },
      viewportWidth: 1024,
      viewportHeight: 875
   }
});
