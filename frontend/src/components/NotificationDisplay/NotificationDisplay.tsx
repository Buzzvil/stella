import React, { useContext, useEffect } from "react";
import NotificationContext, {
  NextMsg
} from "../../hooks/NotificationContext/NotificationContext";

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

export default () => {
  const [state, dispatch] = useContext(NotificationContext);

  useEffect(() => {
    if (!state.length) return;
    delay(1000).then(() => NextMsg(dispatch));
  }, [state[0]]);

  return state.length ? (
    <div>
      <h1>Displaying:</h1>
      <pre>{JSON.stringify(state[0])}</pre>
    </div>
  ) : null;
};
