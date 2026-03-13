import { createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";

export const colors: Record<string, MantineColorsTuple> = {
  convergeTeal: [
    "#E6F4F4",
    "#CDE9E9",
    "#9AC0C3",
    "#6FAFB2",
    "#3F9C9B",
    "#038F8D",
    "#027574",
    "#026160",
    "#024645",
    "#013736",
  ],
};

export const theme = createTheme({
  colors,

  primaryColor: "convergeTeal",

  fontFamily:
    '"Segoe UI", SegoeUI, -apple-system, BlinkMacSystemFont, Arial, sans-serif',

  headings: {
    fontFamily:
      '"Segoe UI", SegoeUI, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
  },

  white: "#FFFFFF",
  black: "#000000",
});