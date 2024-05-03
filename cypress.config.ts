import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    VITE_BASEURL: 'https://forum-api.dicoding.dev/v1',
  },
});
