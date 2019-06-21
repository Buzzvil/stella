import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import IndexPage from "./IndexPage";

storiesOf("Pages|IndexPage", module)
  .add("default", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <CssBaseline />
      <IndexPage />
    </MuiThemeProvider>
  ));
