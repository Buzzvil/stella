import React, { ReactChild, useContext, useEffect } from "react";
import { UserContext, UserProvider } from "../../hooks/UserContext/UserContext";


interface Initializer {
    (): Promise<{user: any}>;
}

const Wrapper = ({ children }: { children: ReactChild }) => (
  <UserProvider children={children}/>
);

const InnerContent = ({ children, init }: { children: ReactChild, init: Initializer }) => {
  const ctx = useContext(UserContext);
  const {state: {user, loading}, dispatch} = ctx;
  useEffect(() => {
      init().then(user => {
        dispatch({type: "setUser", user});
      });
  }, []);
  console.log(ctx)
  if (loading) return <div>Initializing...</div>;
  if (!user) return <div>Not logged in</div>;
  return <div>{children}</div>;
};

export default ({ children, init }: { children: ReactChild, init: Initializer }) => (
  <Wrapper>
    <InnerContent init={init}>
      {children}
    </InnerContent>
  </Wrapper>
);
