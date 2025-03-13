import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import theme from "./component/AppTheme";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
