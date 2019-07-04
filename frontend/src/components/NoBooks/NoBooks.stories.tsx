import React from "react";
import { storiesOf } from "@storybook/react";
import NoBooks from "./NoBooks";
import styled from "styled-components"

import { MuiThemeProvider } from "@material-ui/core";

import StandardTheme from "../../theme/StandardTheme";

const Frame = styled.div`
    margin-top: 91px;
`;

storiesOf("Components|No Books", module)
  .add("Oops", () => (
    <MuiThemeProvider theme={StandardTheme}>
      <Frame>
        <NoBooks />
      </Frame>
    </MuiThemeProvider>
  ));
