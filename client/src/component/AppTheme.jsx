import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#33b9b9",
      main: "#00a8a8",
      dark: "#007575",
      100: "#c1eff4",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffcf33",
      main: "#ffc400",
      dark: "#b28900",
      contrastText: "#000",
    },
    error: {
      light: "#cfe2e6",
      main: "#c4dbe0",
      dark: "#89999c",
      contrastText: "#000",
    },
    danger: {
      light: "#f44336",
      main: "#d32f2f",
      dark: "#c62828",
      contrastText: "#fff",
    },
    text: {
      secondary: "#a6a1b7",
    },
    amber: {
      300: "#ffd54f",
    },
    blue: {
      300: "#64b5f6",
    },
    indigo: {
      300: "#7986cb",
    },
    purple: {
      300: "#ba68c8",
    },
    lightGreen: {
      300: "#aed581",
    },
  },
});

export default theme;
