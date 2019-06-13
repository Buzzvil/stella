import React from "react";

import { storiesOf } from "@storybook/react";

import Cat from "./Cat";

storiesOf("Components|Cat", module)
  .add("Default", () => (
    <Cat />
  ))
