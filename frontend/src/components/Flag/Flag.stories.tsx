import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import Flag from "./Flag";

storiesOf("Component|Flag", module)
  .add("on", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <Flag active={true} />
    </MuiThemeProvider>
  ))
  .add("off", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <Flag active={false} />
    </MuiThemeProvider>
  ));
