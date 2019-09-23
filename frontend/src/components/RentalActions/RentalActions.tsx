import * as React from "react";
import { Button } from "@material-ui/core";
import { ResourceStatus } from "proto/rentalsvc_pb";
import { useAuthContext } from "../../hooks/AuthContext/AuthContext";
import useResourceStatus, { getUserResourceStatus } from "../../hooks/RentalStatus/RentalStatus";

interface RentalActionsProps {
  entityId: number;
}

const RentalActions: React.SFC<RentalActionsProps> = ({ entityId }) => {
  const [loading, status, { rentEntity, returnEntity, watchEntity, unwatchEntity }] = useResourceStatus(
    entityId
  );
  const [{ currentUser }] = useAuthContext();
  if (!currentUser) return <></>;
  const [, userStatus, { }] = getUserResourceStatus(
    currentUser.getId()
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
    ) : userStatus && userStatus.waitedBookIds.some(id => id == entityId) ? (
      <Button 
        variant="contained" 
        color="default" 
        disabled={loading}
        onClick={e => {
          unwatchEntity && unwatchEntity();
        }}>
        Unwatch
      </Button>
    ) : (
      <Button 
        variant="contained" 
        color="default" 
        disabled={loading}
        onClick={e => {
          watchEntity && watchEntity();
        }}>
        Get Notified
      </Button>
    ) 
  ) : (
    <></>
  );
};

export default RentalActions;
