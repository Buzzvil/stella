import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";

interface StatusProps extends FabProps {
  free: boolean;
}

const Status: React.SFC<StatusProps> = ({ free, style: propsStyle = {}, ...props }) => (
  <Fab variant="extended" color={free ? "primary" : "secondary" } style={{ ...propsStyle}} {...props}>
  </Fab>
);

export default Status;
