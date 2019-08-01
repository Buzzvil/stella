import React, { useReducer, createContext, useContext } from "react";
import { User } from "../../../proto/usersvc_pb";
import { UserStatus } from "../../../proto/rentalsvc_pb";

type UserDetails = User & {
  userStatus?: UserStatus;
};

type Action = {
  type: string;
  data?: UserDetails[];
  status?: UserStatus;
};

interface State {
  [key: number]: UserDetails;
}

interface Dispatch {
  (...args: any): void;
}

const UserContext = createContext<[State, Dispatch]>([{}, () => {}]);

const Provider = UserContext.Provider;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MANY":
      if (!action.data) return state;
      return action.data.reduce(
        (a, r) => {
          a[r.getId()] = r;
          return a;
        },
        { ...state }
      );
    default:
      return state;
  }
};

const UserProvider: React.SFC<{ initial?: State }> = ({
  children,
  initial = {} as State
}) => {
  return <Provider value={useReducer(reducer, initial)}>{children}</Provider>;
};

const UserConsumer = UserContext.Consumer;

const setUsers = (dispatch: Dispatch, data: User[]) => {
  dispatch({ type: "SET_MANY", data });
};

const useUserContext = () => useContext(UserContext);

export default UserContext;

export { UserProvider, UserConsumer, setUsers, useUserContext };
