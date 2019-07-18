import * as React from "react";
import { Button } from "@material-ui/core";
import { ResourceStatus } from "proto/rentalsvc_pb";
import { User } from "proto/usersvc_pb";
import {
  ResourceStatusIfc,
  defaultStatusFetcher
} from "../../hooks/RentalStatus/RentalStatus";

interface RentalActionsProps {
  currentUser?: User;
  entityId: number;
  statusFetcher?: ResourceStatusIfc;
}

const RentalActions: React.SFC<RentalActionsProps> = ({
  currentUser,
  entityId,
  statusFetcher = defaultStatusFetcher
}) => {
  const [loading, status, { rentEntity, returnEntity }] = statusFetcher(
    entityId
  );

  return status ? (
    status.getAvailability() === ResourceStatus.Availability.AVAILABLE ? (
      <Button
        variant="contained"
        color="secondary"
        disabled={loading}
        onClick={e => {
          e.stopPropagation();
          rentEntity && rentEntity();
        }}
      >
        Book it
      </Button>
    ) : currentUser && currentUser.getId() === status.getHolder() ? (
      <Button
        variant="contained"
        color="default"
        disabled={loading}
        onClick={e => {
          e.stopPropagation();
          returnEntity && returnEntity();
        }}
      >
        Return
      </Button>
    ) : (
      <Button variant="contained" color="default" disabled={loading}>
        Get Notified
      </Button>
    )
  ) : (
    <></>
  );
};

export default RentalActions;
