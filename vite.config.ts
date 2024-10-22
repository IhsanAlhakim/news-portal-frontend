import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@tiptap/extension-placeholder"],
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BASE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
