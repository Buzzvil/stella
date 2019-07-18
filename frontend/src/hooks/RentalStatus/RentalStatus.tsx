import { useState, useEffect } from "react";
import { RentalServiceClient } from "proto/rentalsvc_grpc_web_pb";
import {
  GetResourceStatusRequest,
  ResourceStatus,
  RentResourceRequest,
  ReturnResourceRequest
} from "proto/rentalsvc_pb";
import { useBookContext, setBookStatus } from "../BookContext/BookContext";
import { useAuthContext } from "../AuthContext/AuthContext";
import Loader from "../Loader/Loader";

const rentalService = new RentalServiceClient(
  process.env.PUBLIC_URL,
  null,
  null
);

interface Actions {
  [key: string]: () => void;
}

export interface ResourceStatusIfc {
  (entityId: number): [boolean, ResourceStatus | undefined, Actions];
}

const getResourceStatus: ResourceStatusIfc = entityId => {
  const [loading, load] = Loader();
  const [status, setStatus] = useState<ResourceStatus>();
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
      getResourceStatus(entityId);
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
      getResourceStatus(entityId);
    });
  };
  useEffect(() => getResourceStatus(entityId), [entityId]);

  return [loading, status, { rentEntity, returnEntity }];
};

export const defaultStatusFetcher: ResourceStatusIfc = () => [
  false,
  new ResourceStatus(),
  {}
];

export default getResourceStatus;
