import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeModeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </Provider>
  </React.StrictMode>
);