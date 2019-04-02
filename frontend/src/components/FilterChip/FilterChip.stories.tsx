import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import FilterChip from "./FilterChip";

storiesOf("FilterChip", module).add("Default", () => (
    <MuiThemeProvider theme={StandardTheme}>
        <FilterChip label="English" onDelete={() => {console.log("Bye~")}} />
    </MuiThemeProvider>
));
