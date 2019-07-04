import React, { useReducer, createContext } from "react";

type Notification = {
  icon?: string;
  msg: string;
};

type Action = {
  type: string;
  data?: Notification;
};

type State = Notification[];

interface ActionCreator {
  (...args: any): void;
}

const NotificationContext = createContext<[State, ActionCreator]>([
  [],
  () => {}
]);

const Provider = NotificationContext.Provider;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DEQUEUE":
      return state.slice(1);
    case "QUEUE":
      if (!action.data) return state;
      return [...state, action.data];
    default:
      return state;
  }
};

const NotificationProvider: React.SFC = ({ children }) => {
  return <Provider value={useReducer(reducer, [])}>{children}</Provider>;
};

const NotificationConsumer = NotificationContext.Consumer;

const NewMsg = (dispatch: ActionCreator, data: Notification) => {
  dispatch({ type: "QUEUE", data });
};

const NextMsg = (dispatch: ActionCreator) => dispatch({ type: "DEQUEUE" });

export default NotificationContext;

export { NotificationProvider, NotificationConsumer, NewMsg, NextMsg };
