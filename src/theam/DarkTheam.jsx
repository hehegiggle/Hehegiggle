import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // This sets the theme to dark mode
    primary: {
      main: "#ffffff",
       // Customize the primary color to your preference
      // main: "red"
    },
    secondary: {
      main: "#ffffff", // Customize the secondary color to your preference
    },
    black: {
      main: "#ffffff",
    },
    background: {
      main: "#212534",
      default: "#212534",
      paper: "#212534",
    },
    textColor: {
      main: "#ffffff",
    },
  },
});

export default darkTheme;
