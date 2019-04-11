import React from "react";
import Fab, { FabProps } from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

interface StatusProps extends FabProps {
  free: boolean;
}

const style = {
  boxShadow: "none",
};

const Status: React.SFC<StatusProps> = ({ free, style: propsStyle = {}, ...props }) => (
  <Fab variant="round" color={free ? "primary" : "secondary" } style={{...style, ...propsStyle}} {...props}>
    {free ? <CheckIcon /> : <CloseIcon />}
  </Fab>
);

export default Status;
