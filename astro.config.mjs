import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      langs: [],
      wrap: false,
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  output: "server",
  adapter: cloudflare({ mode: "directory" }),
});
