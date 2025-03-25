import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import VueRouter from "unplugin-vue-router/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    VueRouter(),
    Components({
      /* options */
    }),

    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.vue\.[tj]sx?\?vue/,
        /\.md$/,
      ],
      imports: ["vue", VueRouterAutoImports],
      dts: true,
      viteOptimizeDeps: true,
    }),
    tailwindcss(),
    vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
