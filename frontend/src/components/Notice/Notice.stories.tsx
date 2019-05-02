import React from "react";

import { storiesOf } from "@storybook/react";
import Notice from "./Notice";


storiesOf("Components|Notice", module).add("Default", () => (
    <Notice children={"Successfully requested!"} />
));
