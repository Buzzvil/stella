import { useState, useEffect } from "react";
import { UserServiceClient } from "proto/usersvc_grpc_web_pb";
import { User, GetCurrentUserRequest } from "proto/usersvc_pb";
import { useAuthContext, signIn } from "../AuthContext/AuthContext";
import Loader from "../Loader/Loader";

const userService = new UserServiceClient(process.env.PUBLIC_URL, null, null);

export default (): [boolean, User | undefined] => {
  const [loading, load] = Loader();
  const [currentUser, setCurrentUser] = useState<User>();
  const [_, dispatch] = useAuthContext();
  const getCurrentUser = () => () => {
    const req = new GetCurrentUserRequest();
    const currentUserPromise: Promise<User> = new Promise((resolve, reject) => {
      userService.getCurrentUser(req, {}, (err: any, user: User) =>
        err ? reject(err) : resolve(user)
      );
    });

    const [cancelled, cancel] = load(
      currentUserPromise.then(user => {
        if (cancelled()) return;
        setCurrentUser(user);
        signIn(dispatch, user);
      })
    );
    return cancel;
  };

  useEffect(getCurrentUser(), []);
  return [loading, currentUser];
};
