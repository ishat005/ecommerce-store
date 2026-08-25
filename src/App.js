import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import getTheme from "./theme";
import { useThemeMode } from "./context/ThemeContext";

function App() {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;