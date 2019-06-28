import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#60C1B6",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FF9F1C",
      contrastText: "#FFFFFF"
    },
    error: {
      main: "#FF6363",
      contrastText: "#FFFFFF"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255,255, 0.3)"
    },
    background: {
      default: "#051625",
      paper: "#233443"
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textTransform: 'none',
        borderRadius: '200px',
        height: '50px'
      },
      outlinedPrimary: {
        color: '#FFFFFF',
        borderWidth: '2px',
      }
    },
    MuiCard: {
      root: {
        backgroundColor: '#233443',
      }
    }
  }
});
