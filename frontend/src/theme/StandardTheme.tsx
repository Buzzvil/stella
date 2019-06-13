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
      text: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold'
      }
    }
  }
});
