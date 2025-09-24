// @ts-check
import db from "@astrojs/db";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import svgr from "vite-plugin-svgr";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), db(), icon()],
  adapter: netlify(),
  vite: {
    plugins: [
      svgr({
        include: "**/*.svg?react",
      }),
    ],
  },
});