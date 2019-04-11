import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import Status from "./Status";

storiesOf("Status", module).add("Default", () => (
    <MuiThemeProvider theme={StandardTheme}>
        <Status free={true} />
    </MuiThemeProvider>
));
