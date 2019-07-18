import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import StandardTheme from "../../theme/StandardTheme";
import { storiesOf } from "@storybook/react";
import MainLogo from "./MainLogo";

storiesOf("Components|MainLogo", module).add("Default", () => (
  <MuiThemeProvider theme={StandardTheme}>
    <CssBaseline />
    <MainLogo />
  </MuiThemeProvider>
));
