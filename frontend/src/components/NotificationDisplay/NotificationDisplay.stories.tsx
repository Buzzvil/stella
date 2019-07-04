import React, { useState, useContext } from "react";

import { storiesOf } from "@storybook/react";
import NotificationDisplay from "./NotificationDisplay";
import NotificationContext, {
  NotificationProvider,
  NewMsg
} from "../../hooks/NotificationContext/NotificationContext";

const AddButton: React.SFC = () => {
  const [n, setN] = useState(0);
  const [_, dispatch] = useContext(NotificationContext);
  return (
    <button
      onClick={() => {
        setN(n + 1);
        NewMsg(dispatch, { msg: `Test Message ${n}` });
      }}
    >
      Add New Message
    </button>
  );
};

storiesOf("Organisms|NotificationDisplay", module).add("Default", () => {
  return (
    <NotificationProvider>
      <AddButton />
      <NotificationDisplay />
    </NotificationProvider>
  );
});
