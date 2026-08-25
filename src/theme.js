import { createTheme } from "@mui/material/styles";

// Now a function instead of a static object — takes "light" or "dark",
// returns the matching MUI theme.
export default function getTheme(mode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#6366f1",
      },
      background: {
        default: isDark ? "#0f172a" : "#f8fafc",
        paper: isDark ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f1f5f9" : "#0f172a",
      },
    },
    typography: {
      fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? "0 1px 3px rgba(0,0,0,0.4)"
              : "0 1px 3px rgba(0,0,0,0.08)",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
            "&:hover": {
              boxShadow: isDark
                ? "0 8px 20px rgba(0,0,0,0.5)"
                : "0 8px 20px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
}