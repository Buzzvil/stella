import React, { useReducer, createContext, useContext } from "react";
import { User } from "../../../proto/usersvc_pb";

type Action = {
  type: string;
  data?: User;
};

interface State {
  currentUser?: User;
}

interface Dispatch {
  (...args: any): void;
}

const AuthContext = createContext<[State, Dispatch]>([{}, () => {}]);

const Provider = AuthContext.Provider;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SIGN_IN":
      if (!action.data) return state;
      return {
        currentUser: action.data
      };
    case "SIGN_OUT":
      return {};
    default:
      return state;
  }
};

const AuthProvider: React.SFC<{ initial?: State }> = ({
  children,
  initial = {} as State
}) => {
  return <Provider value={useReducer(reducer, initial)}>{children}</Provider>;
};

const AuthConsumer = AuthContext.Consumer;

const signIn = (dispatch: Dispatch, user: User) => {
  dispatch({ type: "SIGN_IN", data: user });
};

const signOut = (dispatch: Dispatch) => {
  dispatch({ type: "SIGN_OUT" });
};

const useAuthContext = () => useContext(AuthContext);

export default AuthContext;

export { AuthProvider, AuthConsumer, signIn, signOut, useAuthContext };
