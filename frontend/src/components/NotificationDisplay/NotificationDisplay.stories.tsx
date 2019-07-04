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

const NotificationMonitor: React.SFC = () => {
  const [state] = useContext(NotificationContext);
  return (
    <div style={{ margin: ".5em 0" }}>
      Messages waiting:
      <div
        style={{
          maxWidth: "200px",
          minHeight: "calc(1em + 4px)",
          padding: "4px",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "4px"
        }}
      >
        {state.length > 1
          ? Array(state.length - 1)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "inline-block",
                    height: "1em",
                    width: "1em",
                    margin: "2px",
                    backgroundColor: "green",
                    verticalAlign: "middle"
                  }}
                />
              ))
          : null}
      </div>
    </div>
  );
};

storiesOf("Organisms|NotificationDisplay", module).add("Default", () => {
  return (
    <NotificationProvider>
      <AddButton />
      <NotificationMonitor />
      <NotificationDisplay />
    </NotificationProvider>
  );
});
