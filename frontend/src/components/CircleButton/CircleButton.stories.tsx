import React from "react";

import { storiesOf } from "@storybook/react";
import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";
import CircleButton from "./CircleButton";
import FaceProfileIcon from "../../img/face-profile.svg";

storiesOf("CircleButton", module).add("Primary", () => (
  <MuiThemeProvider theme={StandardTheme}>
    <CircleButton>
        <img src={FaceProfileIcon}/>
    </CircleButton>
  </MuiThemeProvider>
));
