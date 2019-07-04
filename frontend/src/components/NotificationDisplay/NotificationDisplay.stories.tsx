import React from "react";

import { storiesOf } from "@storybook/react";
import NotificationDisplay from "./NotificationDisplay";
import { NotificationProvider } from "../../hooks/NotificationContext/NotificationContext";


storiesOf("Organisms|NotificationDisplay", module).add("Default", () => (
    <NotificationProvider>
        <NotificationDisplay></NotificationDisplay>
    </NotificationProvider>
));
