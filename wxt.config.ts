import path from "path";
import React from "react";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  vite: (env) => {
    return {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "entrypoints"),
        },
      },
    };
  },

  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      name: "Leetcode Helper",
      description:
        "Leetcode Helper is a tool that helps you solve Leetcode problems.",
      version: "1.0.0",
      manifest_version: 3,
      permissions: ["activeTab", "scripting", "activeTab"],
      host_permissions: ["https://leetcode.com/*"],
    };
  },
});
