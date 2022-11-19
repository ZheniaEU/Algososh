import { defineConfig } from "cypress"

export default defineConfig({

   viewportWidth: 1600,
   viewportHeight: 1000,
   e2e: {
      baseUrl: "http://localhost:2"
   }
})
