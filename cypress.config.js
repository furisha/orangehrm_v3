const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 20000,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  waitForAnimations: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}']
  },
})
