const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://www.automationexercise.com",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
