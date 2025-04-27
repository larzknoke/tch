import { defineConfig, defaultConfig, createSystem } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          300: { value: "#ECF0F3" },
          400: { value: "#6E97C0" },
          500: { value: "#19416a" },
        },
        gold: {
          500: { value: "#C0A26E" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          // contrast: { value: "{colors.brand.100}" },
          // fg: { value: "{colors.brand.700}" },
          // muted: { value: "{colors.brand.100}" },
          // subtle: { value: "{colors.brand.200}" },
          // emphasized: { value: "{colors.brand.300}" },
          // focusRing: { value: "{colors.brand.500}" },
        },
        gold: {
          solid: { value: "{colors.gold.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
