import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
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
      primary: "#FFFFFF"
    },
    background: {
      default: "#051625",
      paper: "#051625"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '200px',
        height: '50px'
      },
      contained: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textTransform: 'none'
      },
      outlined: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textTransform: 'none',
        borderWidth: '2px',
      },
      outlinedPrimary: {
        color: '#FFFFFF',
        borderWidth: '2px',
      }
    }
  }
});
