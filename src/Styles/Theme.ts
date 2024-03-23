import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "SBAB",
    body1: {
      fontSize: "clamp(1.2rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 1.375rem)",
    },

    body2: {
      fontSize: "clamp(1rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 1rem)",
    },

    h1: {
      fontSize: "clamp(2.7rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 3.75rem)",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "clamp(1.4rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 2rem)",
      fontWeight: "bold",
      paddingBottom: "1.5rem",
    },
    h3: {
      fontSize: "clamp(1.rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 1.5rem)",
      fontWeight: "bold",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "SBAB",
    body1: {
      fontSize: "clamp(1.2rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 1.375rem)",
    },

    body2: {
      fontSize: "clamp(1rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 1rem)",
    },

    h1: {
      fontSize: "clamp(2.7rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 3.75rem)",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "clamp(1.4rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 2rem)",
      fontWeight: "bold",
      paddingBottom: "1.5rem",
    },
    h3: {
      fontSize: "clamp(1.rem, calc(2rem + ((1vw - 7.68px) * 6.25)), 1.5rem)",
      fontWeight: "bold",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

export const Theme = lightTheme;
