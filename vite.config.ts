import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import fs from "fs";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  server: {
    // https: {
    //   key: fs.readFileSync("cert/localhost-key.pem"),
    //   cert: fs.readFileSync("cert/localhost-cert.pem"),
    // },
    // port: 5173,
  },
});
