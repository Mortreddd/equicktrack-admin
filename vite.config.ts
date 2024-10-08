import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// TODO: Uncomment if using for production
// Polyfill for __dirname in ES modules
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
