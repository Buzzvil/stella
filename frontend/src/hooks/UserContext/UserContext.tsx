// import { useEffect, useContext } from "react";
// import Loader from "../Loader/Loader";
// import User from "../User/User";

// const Initializer = () => {
//   const [loading, load] = Loader(true);
//   const user = useContext(User);
//   useEffect(() => {
//       console.log(user)
//   })

//   const getUser = () =>
//       load(new Promise(resolve => {
//           setTimeout(() => resolve({}), 1000)
//       }).then(user => user));

//       return {
//           loading,
//           user,
//           getUser,
//       }
// };

// Initializer.Provider = User.Provider;

// export default Initializer;
// Context.js
// new
import React, { useReducer, useEffect } from "react";
import Loader from "../Loader/Loader";
// new
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
