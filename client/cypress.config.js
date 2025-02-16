import { defineConfig } from "cypress";

export default defineConfig({
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    e2e: {
        baseUrl: "http://localhost:5173",
        excludeSpecPattern: ['**/1-getting-started, **/2-advanced-examples'],
        specPattern: 'cypress/e2e/**/*.spec.{js, ts, jsx, tsx}',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});