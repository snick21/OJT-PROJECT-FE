import { Stack, NavLink } from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <Stack
      p="md"
      style={{
        width: 220,
        minHeight: "100vh",
        borderRight: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <NavLink
        component={RouterNavLink}
        to="/"
        label="Dashboard"
        style={{ borderRadius: "var(--mantine-radius-sm)" }}
      />
    </Stack>
  );
}