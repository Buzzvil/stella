import { useState, useEffect } from "react";
import { RentalServiceClient } from "proto/rentalsvc_grpc_web_pb";
import {
  GetResourceStatusRequest,
  ResourceStatus,
  RentResourceRequest,
  ReturnResourceRequest,
  GetUserStatusRequest,
  UserStatus,
  WatchResourceRequest,
  UnwatchResourceRequest
} from "proto/rentalsvc_pb";
import { useBookContext, setBookStatus } from "../BookContext/BookContext";
import { useAuthContext } from "../AuthContext/AuthContext";
import Loader from "../Loader/Loader";
import {
  useNotificationContext,
  NewMsg
} from "../NotificationContext/NotificationContext";

const rentalService = new RentalServiceClient(
  process.env.PUBLIC_URL,
  null,
  null
);

interface UserResourceStatus {
  heldBookIds: number[];
  rentedBookIds: number[];
  waitedBookIds: number[];
}

interface Actions {
  [key: string]: () => void;
}

export interface ResourceStatusIfc {
  (entityId: number): [boolean, ResourceStatus | undefined, Actions];
}

const getResourceStatus: ResourceStatusIfc = entityId => {
  const [loading, load] = Loader();
  const [status, setStatus] = useState<ResourceStatus>();
  const [, dispatchNoti] = useNotificationContext();
  const [_, dispatch] = useBookContext();
  const [{ currentUser }] = useAuthContext();
  const getResourceStatus = (entityId: number) => {
    const req = new GetResourceStatusRequest();
    req.setEntityId(entityId);
    const statusPromise: Promise<ResourceStatus> = new Promise(
      (resolve, reject) => {
        rentalService.getResourceStatus(
          req,
          {},
          (err: any, s: ResourceStatus) => (err ? reject(err) : resolve(s))
        );
      }
    );

    const [cancelled, cancel] = load(
      statusPromise.then(s => {
        if (cancelled()) return;
        setBookStatus(dispatch, s);
        setStatus(s);
      })
    );
    return cancel;
  };

  const rentEntity = () => {
    if (!currentUser) throw new Error("Not signed in!");
    const req = new RentResourceRequest();
    req.setEntityId(entityId);
    req.setUserId(currentUser.getId());
    rentalService.rentResource(req, {}, (err, res) => {
      if (err) {
        throw err;
      }
      NewMsg(dispatchNoti, { msg: `Successfully rented!` });
      getResourceStatus(entityId);
    });
  };

  const watchEntity = () => {
    if (!currentUser) throw new Error("Not signed in!");
    const req = new WatchResourceRequest();
    req.setEntityId(entityId);
    req.setUserId(currentUser.getId());
    rentalService.watchResource(req, {}, (err, res) => {
      if (err) {
        throw err;
      }
      NewMsg(dispatchNoti, { msg: `Successfully watched!` });
    });
  };

  const unwatchEntity = () => {
    if (!currentUser) throw new Error("Not signed in!");
    const req = new UnwatchResourceRequest();
    req.setEntityId(entityId);
    req.setUserId(currentUser.getId());
    rentalService.unwatchResource(req, {}, (err, res) => {
      if (err) {
        throw err;
      }
      NewMsg(dispatchNoti, { msg: `Successfully unwatched!` });
    });
  };

  const returnEntity = () => {
    if (!currentUser) throw new Error("Not signed in!");
    const req = new ReturnResourceRequest();
    req.setEntityId(entityId);
    req.setUserId(currentUser.getId());
    rentalService.returnResource(req, {}, (err, res) => {
      if (err) {
        throw err;
      }
      NewMsg(dispatchNoti, { msg: `Successfully returned!` });
      getResourceStatus(entityId);
    });
  };
  useEffect(() => getResourceStatus(entityId), [entityId]);

  return [loading, status, { rentEntity, returnEntity, watchEntity, unwatchEntity }];
};


export const defaultStatusFetcher: ResourceStatusIfc = () => [
  false,
  new ResourceStatus(),
  {}
];

export interface UserStatusIfc {
  (userId: number): [boolean, UserResourceStatus | undefined, Actions];
}

export const getUserResourceStatus: UserStatusIfc = userId => {
  const [loading, load] = Loader();
  const [status, setStatus] = useState<UserResourceStatus>();
  const getUserResourceStatus = (userId: number) => {
    const req = new GetUserStatusRequest();
    req.setUserId(userId);
    const statusPromise: Promise<UserStatus> = new Promise(
      (resolve, reject) => {
        rentalService.getUserStatus(req, {}, (err: any, s: UserStatus) =>
          err ? reject(err) : resolve(s)
        );
      }
    );
    const [cancelled, cancel] = load(
      statusPromise
        .then(s => {
          if (cancelled()) return [];
          setStatus({
            heldBookIds: s.getHeldEntityIdsList(),
            rentedBookIds: s.getRentedEntityIdsList(),
            waitedBookIds: s.getWatchingEntityIdsList()
          });
        })
        .catch(err => {
          console.log(err);
        })
    );
    return cancel;
  };
  useEffect(() => getUserResourceStatus(userId), [userId]);

  return [loading, status, {}];
};

export default getResourceStatus;
