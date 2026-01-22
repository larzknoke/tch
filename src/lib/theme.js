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
        blue: {
          50: "#e6edf4",
          100: "#c2d3e3",
          200: "#9bb6d1",
          300: "#7399bf",
          400: "#4d7eae",
          500: "#19416a", // Hauptfarbe
          600: "#153a5f",
          700: "#113253",
          800: "#0c2946",
          900: "#071f38",
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
