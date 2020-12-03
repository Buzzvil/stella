import React from "react";
import { storiesOf } from "@storybook/react";
import WaitList from "./WaitList";

import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";

const src = "https://via.placeholder.com/48";

storiesOf("Organisms|Wait List", module)
  .add("Default", () => (
    <MuiThemeProvider theme={StandardTheme}>
        <WaitList reader={{name: 'Liam', thumb: src }} waitlist={[{name: 'Max', thumb: src}, { name: 'Phil', thumb: src}]} />
    </MuiThemeProvider>
  ));
