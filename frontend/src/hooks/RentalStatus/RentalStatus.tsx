import { useState, useEffect } from "react";
import { RentalServiceClient } from 'proto/rentalsvc_grpc_web_pb';
import { GetResourceStatusRequest, ResourceStatus } from 'proto/rentalsvc_pb';
import Loader from "../Loader/Loader";

const rentalService = new RentalServiceClient(process.env.PUBLIC_URL, null, null);

const getResourceStatus = (bookId: number): [boolean, ResourceStatus] => {
  const [loading, load] = Loader();
  const [status, setStatus] = useState<ResourceStatus>();
  const getResourceStatus = (bookId: number) => () => {
      const req = new GetResourceStatusRequest();
      req.setEntityId(bookId)
      const statusPromise: Promise<ResourceStatus> = new Promise((resolve, reject) => {
        rentalService.getResourceStatus(req, {}, (err: any, status: ResourceStatus) => err ? reject(err) : resolve(status))
      });

      const [cancelled, cancel] = load(statusPromise
        .then(status => {
          if (cancelled()) return;
          setStatus(status);
        })
      );
      return cancel;
  };

  useEffect(getResourceStatus(bookId), []);
  return [loading, status || new ResourceStatus];
};

export default getResourceStatus;
