import { useState, useEffect } from "react";
import { RentalServiceClient } from 'proto/rentalsvc_grpc_web_pb';
import { GetResourceStatusRequest, ResourceStatus } from 'proto/rentalsvc_pb';
import Loader from "../Loader/Loader";

const rentalService = new RentalServiceClient(process.env.PUBLIC_URL, null, null);

const getResourceStatus = (entityId: number): [boolean, ResourceStatus | undefined] => {
  const [loading, load] = Loader();
  const [status, setStatus] = useState<ResourceStatus>();
  const getResourceStatus = (entityId: number) => () => {
    const req = new GetResourceStatusRequest();
    req.setEntityId(entityId)
    const statusPromise: Promise<ResourceStatus> = new Promise((resolve, reject) => {
      rentalService.getResourceStatus(req, {}, (err: any, s: ResourceStatus) => err ? reject(err) : resolve(s))
    });

    const [cancelled, cancel] = load(statusPromise
      .then(s => {
        if (cancelled()) return;
        setStatus(s);
      })
    );
    return cancel;
  };

  useEffect(getResourceStatus(entityId), []);
  return [loading, status];
};

export default getResourceStatus;
