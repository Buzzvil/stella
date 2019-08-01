import { useState, useEffect } from "react";
import { RentalServiceClient } from "proto/rentalsvc_grpc_web_pb";
import { BookServiceClient } from "proto/booksvc_grpc_web_pb";
import { ListBooksRequest, ListBooksResponse, Book } from "proto/booksvc_pb";
import {
  GetResourceStatusRequest,
  ResourceStatus,
  RentResourceRequest,
  ReturnResourceRequest,
  GetUserStatusRequest,
  UserStatus
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

const bookService = new BookServiceClient(process.env.PUBLIC_URL, null, null);

interface UserResourceStatus {
  heldBooks: Book[];
  rentedBooks: Book[];
  waitedBooks: Book[];
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

  return [loading, status, { rentEntity, returnEntity }];
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
    // Fetch Books with ids
    const listBooks = (ids: number[]): Promise<Book[]> => {
      const req = new ListBooksRequest();
      const bookPromise: Promise<Book[]> = new Promise((resolve, reject) => {
        if (ids.length == 0) {
          resolve([]);
          return;
        }
        req.setIdsList(ids);
        bookService.listBooks(req, {}, (err: any, resp: ListBooksResponse) =>
          err ? reject(err) : resolve(resp.getBooksList())
        );
      });

      return bookPromise;
    };
    const [cancelled, cancel] = load(
      statusPromise
        .then(s => {
          if (cancelled()) return [];
          const heldBookIds = s.getHeldEntityIdsList();
          return listBooks(heldBookIds);
        })
        .then(books => {
          setStatus({
            heldBooks: books,
            rentedBooks: [],
            waitedBooks: []
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
