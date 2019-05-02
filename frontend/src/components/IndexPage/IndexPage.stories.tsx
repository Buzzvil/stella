import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import IndexPage from "./IndexPage";

storiesOf("Page|IndexPage", module)
  .add("default", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <IndexPage />
    </MuiThemeProvider>
  ));
