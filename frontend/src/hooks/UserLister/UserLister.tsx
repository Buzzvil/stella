import { useState, useEffect } from "react";
import { UserServiceClient } from "proto/usersvc_grpc_web_pb";
import { useAuthContext, signIn } from "../AuthContext/AuthContext";
import {
  User,
  ListUsersRequest,
  ListUsersResponse,
  GetCurrentUserRequest
} from "proto/usersvc_pb";
import {
  useUserContext,
  setUsers as setContextUsers
} from "../UserContext/UserContext";
import Loader from "../Loader/Loader";

const userService = new UserServiceClient(process.env.PUBLIC_URL, null, null);

const getCurrentUser = (): [boolean, User | undefined] => {
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

const listUsers = (ids: number[]): [boolean, User[]] => {
  const [loading, load] = Loader();
  const [users, setUsers] = useState<User[]>([]);
  const [_, dispatch] = useUserContext();
  const listUsers = () => () => {
    const req = new ListUsersRequest();
    req.setIdsList(ids);
    const listUsersPromise: Promise<User[]> = new Promise((resolve, reject) => {
      userService.listUsers(req, {}, (err: any, res: ListUsersResponse) =>
        err ? reject(err) : resolve(res.getUsersList())
      );
    });

    const [cancelled, cancel] = load(
      listUsersPromise.then(users => {
        if (cancelled()) return;
        setUsers(users);
        setContextUsers(dispatch, users);
      })
    );
    return cancel;
  };

  useEffect(listUsers(), []);
  return [loading, users];
};

export { getCurrentUser, listUsers };
