import { useState, useEffect } from "react";
import { RentalServiceClient } from "proto/rentalsvc_grpc_web_pb";
import {
  GetResourceStatusRequest,
  ResourceStatus,
  RentResourceRequest,
  ReturnResourceRequest
} from "proto/rentalsvc_pb";
import { useBookContext, setBookStatus } from "../BookContext/BookContext";
import Loader from "../Loader/Loader";
// import { Empty } from "google-protobuf/google/protobuf/empty_pb";

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
    const req = new RentResourceRequest();
    req.setEntityId(entityId);
    rentalService.rentResource(req, {}, (err, res) => {
      if (err) {
        throw err;
      }
      getResourceStatus(entityId);
    });
  };

  const returnEntity = () => {
    const req = new ReturnResourceRequest();
    req.setEntityId(entityId);
    req.setUserId(1);
    rentalService.rentResource(req, {}, (err, res) => {
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
