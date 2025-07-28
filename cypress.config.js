const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4000',
    env: {
      // Segurança: outras credenciais vêm do process.env, nunca hardcoded
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
