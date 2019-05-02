import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import RoundButton from "./RoundButton";

storiesOf("Component|RoundButton", module).add("Primary", () => (
  <MuiThemeProvider theme={StandardTheme}>
    <RoundButton>REQUEST A BOOK</RoundButton>
  </MuiThemeProvider>
));
