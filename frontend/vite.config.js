import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      firebase: resolve(__dirname, "./node_modules/firebase"),
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [
        "firebase/app",
        "firebase/firestore",
        "firebase/auth",
        "firebase/storage",
      ],
      output: {
        globals: {
          "firebase/app": "firebase",
          "firebase/firestore": "firebase.firestore",
          "firebase/auth": "firebase.auth",
          "firebase/storage": "firebase.storage",
        },
        manualChunks: (id) => {
          if (id.includes("node_modules/firebase")) {
            return "firebase";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "firebase/app",
      "firebase/firestore",
      "firebase/auth",
      "firebase/storage",
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    target: "es2020",
  },
});
