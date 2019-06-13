import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import InitializingDisplay from "./InitializingDisplay";

const exampleInitializer = (user: any) => () => new Promise<{user: any}>(resolve => setTimeout(() => resolve({user}), 3000));

storiesOf("Pages|IndexPage", module)
  .add("Not logged in", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <InitializingDisplay init={exampleInitializer(null)}>
        Logged in content
      </InitializingDisplay>
    </MuiThemeProvider>
  ))
  .add("Logged in", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <InitializingDisplay init={exampleInitializer({})}>
        Logged in content
      </InitializingDisplay>
    </MuiThemeProvider>
  ));
