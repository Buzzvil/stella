import React, { useReducer, useEffect } from "react";
let reducer = (state: any, {type, user}: any) => {
  switch (type) {
    case "setUser":
      return {...state, user, loading: false};
    case "load":
      return {...state, loading: true}
  }
};
const initialState: any = {user: null, loading: true};
const UserContext = React.createContext(initialState);
function UserProvider(props: any) {
  // new
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    // new
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };
