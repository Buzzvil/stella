import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#60C1B6",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FFE76A",
      contrastText: "#051625"
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
    h3: {
      fontSize: '34px',
      fontWeight: 'bold',
      letterSpacing: '-1px'
    },
    h5: {
      fontSize: '21px',
      fontWeight: 'bold'
    },
    h6: {
      fontSize: '16px',
    },
    body2: {
      fontSize: '12px'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textTransform: 'none',
      },
      contained: {
        borderRadius: '10px',
      },
      containedPrimary: {
        borderRadius: '200px',
      },
      outlinedPrimary: {
        color: '#FFFFFF',
        borderWidth: '2px',
        borderRadius: '200px',
      }
    },
    MuiCard: {
      root: {
        backgroundColor: '#233443',
        borderRadius: '24px',
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '8px',
      }
    }
  }
});
