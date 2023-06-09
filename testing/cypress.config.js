const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 940,
    viewportWidth: 1350,
    end: {
      URL: "http://localhost:4200/",
    },
  },
});
