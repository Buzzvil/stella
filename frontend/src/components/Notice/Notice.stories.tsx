import React from "react";

import { storiesOf } from "@storybook/react";
import Notice from "./Notice";


storiesOf("Component|Notice", module).add("Default", () => (
    <Notice children={"Successfully requested!"} />
));
