import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Asegúrate de usar la URL correcta
    setupNodeEvents(on, config) {

    },
  },
});