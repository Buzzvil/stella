import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import SignInPage from "./SignInPage";

storiesOf("Pages|SignInPage", module)
  .add("default", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <CssBaseline />
      <SignInPage />
    </MuiThemeProvider>
  ));
