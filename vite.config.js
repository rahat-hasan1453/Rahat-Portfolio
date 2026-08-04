import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/* In dev, Vite's SPA fallback answers /admin/ with the app's index.html, so the
   CMS only opened at the full /admin/index.html. Static hosts serve the
   directory index themselves, so this only affects `npm run dev` — but the URL
   should be the same in both places. */
const serveAdminIndex = {
  name: "serve-admin-index",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/admin" || req.url === "/admin/") req.url = "/admin/index.html";
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), serveAdminIndex],
  server: {
    port: 5173,
  },
});
