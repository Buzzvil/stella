import React, { useContext, useEffect, useState } from "react";
import NotificationContext, {
  NewMsg,
  NextMsg
} from "../../hooks/NotificationContext/NotificationContext";

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

export default () => {
  const [n, setN] = useState(0);
  const [state, dispatch] = useContext(NotificationContext);

  useEffect(() => {
    if (!state[0]) return;
    delay(1000).then(() => NextMsg(dispatch));
  }, [state[0]]);

  return (
    <div>
      <button
        onClick={() => {
          setN(n + 1);
          dispatch({
            type: "QUEUE",
            data: {
              msg: `Test Message ${n}`
            }
          });
        }}
      >
        Add New Message
      </button>
      {state[0] === undefined ? null : (
        <div>
          <h1>Displaying:</h1>
          <pre>{JSON.stringify(state[0])}</pre>
        </div>
      )}
    </div>
  );
};
