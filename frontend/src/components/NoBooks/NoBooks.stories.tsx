import React from "react";
import { storiesOf } from "@storybook/react";
import NoBooks from "./NoBooks";

import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";

storiesOf("Components|No Books", module)
  .add("Oops", () => (
    <MuiThemeProvider theme={StandardTheme}>
        <NoBooks />
    </MuiThemeProvider>
  ));
